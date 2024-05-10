#define BLYNK_TEMPLATE_ID "TMPL6xTvZ9Wvl"
#define BLYNK_TEMPLATE_NAME "SleepWell"
#define BLYNK_AUTH_TOKEN "y_gDc3vpDNLBUP_pYa4jsYGKwVJVi417"

#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DNSServer.h>
#include <WiFiManager.h>
#include <ArduinoJson.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp8266.h>
#include "arduinoFFT.h"

char auth[] = BLYNK_AUTH_TOKEN;
const char *ssid = ssid;
const char *pass = pass;
String recordStatus = "";
uint16_t snoreCount;

BlynkTimer timer;
WiFiServer server(80);
ESP8266WebServer httpServer(80);

void setCorsHeaders() {
  httpServer.sendHeader("Access-Control-Allow-Origin", "*");
  httpServer.sendHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  httpServer.sendHeader("Access-Control-Allow-Headers", "Content-Type");
  httpServer.sendHeader("Access-Control-Allow-Credentials", "true");
}

void myTimerEvent() {
  Blynk.virtualWrite(V0, "test");
}

ArduinoFFT<double> FFT;

void handleSnore() {
  DynamicJsonDocument snoreDoc(200);
  snoreDoc["snoreCount"] = snoreCount;
  String jsonResponse;
  serializeJson(snoreDoc, jsonResponse);

  setCorsHeaders();
  httpServer.send(200, "application/json", jsonResponse);
}

void handleData() {
  String jsonString = httpServer.arg("plain");
  Serial.println("Received JSON: " + jsonString);

  DynamicJsonDocument doc(200);
  DeserializationError error = deserializeJson(doc, jsonString);

  if (error) {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.c_str());
    httpServer.send(400, "text/plain", "Invalid JSON");
    return;
  }

  String status = doc["recordStatus"];
  recordStatus = status;
  Serial.println("Start Recording: " + String(recordStatus));

  DynamicJsonDocument responseDoc(200);
  responseDoc["status"] = recordStatus == "start" ? true : false;

  if (recordStatus == "stop") {
    responseDoc["snoreCount"] = snoreCount;
    snoreCount = 0;
  }

  String jsonResponse;
  serializeJson(responseDoc, jsonResponse);

  setCorsHeaders();
  httpServer.send(200, "application/json", jsonResponse);
}

#define CHANNEL A0
const uint16_t samples = 64;            
const double samplingFrequency = 2000;  
uint8_t exponent;
unsigned int sampling_period_us;
unsigned long microseconds;

double vReal[samples];
double vImag[samples];

#define SCL_INDEX 0x00
#define SCL_TIME 0x01
#define SCL_FREQUENCY 0x02
#define SCL_PLOT 0x03

bool snoringState;
uint8_t detectIndex, snoringCount, correctPeriodCount;
const uint16_t snoreThreshold = 200;
uint32_t startQuietTime, stopQuietTime, startLoudTime, stopLoudTime;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  sampling_period_us = round(1000000 * (1.0 / samplingFrequency));
  Serial.begin(115200);

  WiFiManager wifiManager;
  wifiManager.autoConnect("SleepWell");

  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("Connected to Wifi");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Blynk.begin(auth, ssid, pass);

  

  httpServer.on("/snore", HTTP_GET, handleSnore);
  httpServer.on("/record", HTTP_POST, handleData);
  
  httpServer.begin();

  pinMode(D0, OUTPUT);
  digitalWrite(D0, LOW);
  pinMode(D4, OUTPUT);
  digitalWrite(D4, HIGH);
  pinMode(D5, OUTPUT);
  digitalWrite(D5, HIGH);

  exponent = 0;
  uint16_t tempSamples = samples;
  while (tempSamples >>= 1) {
    exponent++;
  }
}

void loop() {
  httpServer.handleClient();

  if (recordStatus == "start") {
    Blynk.run();

    microseconds = micros();
    for (int i = 0; i < samples; i++) {
      vReal[i] = analogRead(CHANNEL);
      vImag[i] = 0;
      while (micros() - microseconds < sampling_period_us) {
        // empty loop
      }
      microseconds += sampling_period_us;
    }
    FFT.dcRemoval(vReal, samples);

    FFT.windowing(vReal, samples, FFT_WIN_TYP_HAMMING, FFT_FORWARD); /* Weigh data */

    FFT.compute(vReal, vImag, samples, exponent, FFT_FORWARD); /* Compute FFT */

    FFT.complexToMagnitude(vReal, vImag, samples); /* Compute magnitudes */

    SnoringDetect(ComputeSumPower(vReal, (samples >> 1)));
    Serial.print("\t\tState:" + String(snoringState * 100));
    Serial.println("\t\tCount:" + String(correctPeriodCount * 100));
    Blynk.virtualWrite(V2, snoringState);
    Blynk.virtualWrite(V3, correctPeriodCount);

    delay(50);
  }
}


uint16_t ComputeSumPower(double *vData, uint16_t bufferSize) {
  uint16_t sum;

  for (uint16_t i = 0; i < bufferSize; i++) {
    sum += vData[i];
  }
  Serial.print("Sound:" + String(sum));
  Blynk.virtualWrite(V1, sum);
  return sum;
}

void PrintVector(double *vData, uint16_t bufferSize, uint8_t scaleType) {
  for (uint16_t i = 0; i < bufferSize; i++) {
    double abscissa;
    /* Print abscissa value */
    switch (scaleType) {
      case SCL_INDEX:
        abscissa = (i * 1.0);
        break;
      case SCL_TIME:
        abscissa = ((i * 1.0) / samplingFrequency);
        break;
      case SCL_FREQUENCY:
        abscissa = ((i * 1.0 * samplingFrequency) / samples);
        break;
    }
    //    Serial.print("x:");
    Serial.println(vData[i], 3);
    //        Serial.print(" \t");
  }
  Serial.println();
}

void SnoringDetect(uint16_t sumPower) {

  if (snoringState) {  // quiet sound from loud
    if (sumPower <= snoreThreshold - 10) {
      detectIndex++;
      if (detectIndex >= 5) {
        snoringState = LOW;
        startQuietTime = millis();
        //         calPeriodTime();
      }
    } else {
      detectIndex = 0;
    }
  } else {  // loud sound from quiet
    if (sumPower >= snoreThreshold + 10) {
      detectIndex++;
      if (detectIndex >= 5) {
        snoringState = HIGH;
        startLoudTime = millis();
        calPeriodTime();
      }
    } else {
      detectIndex = 0;
    }
  }
}

void calPeriodTime() {
  if (!startQuietTime || !startLoudTime) {
    Serial.println("not full period");
    correctPeriodCount = 0;
    return;
  }

  int32_t periodTime = startQuietTime - startLoudTime;
  periodTime = abs(periodTime);
  if (periodTime < 1500 || periodTime > 3300) {
    Serial.println("Time not in range");
    correctPeriodCount = 0;
    return;
  }

  correctPeriodCount++;
  if (correctPeriodCount > 0) {
    correctPeriodCount = 0;
    snoringAction();
  }
}

void snoringAction() {

  snoreCount++;
  Serial.println("Snore Detected!!! " + String(snoreCount) + " times");
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
}
