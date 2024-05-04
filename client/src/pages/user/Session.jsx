import { useState, useEffect } from "react";
import { useRecordWebcam } from "react-record-webcam";
import { toast } from "react-toastify";
import UserNavbar from "./UserNavbar";
import SessionButton from "../../components/button/SessionButton";
import { formatTimer, formatTimeInAMPM } from "../../utils/formatTime";
import {
  useCreateRecordMutation,
  useRecordStatusMutation,
} from "../../services/redux/api/recordApiSlice";
import { fetchSnoreCount } from "../../services/api/fetchSnoreCount";

const Session = () => {
  const {
    createRecording,
    pauseRecording,
    resumeRecording,
    openCamera,
    startRecording,
    stopRecording,
    activeRecordings,
  } = useRecordWebcam();

  useEffect(() => {
    const startRecordingAsync = async () => {
      const newRecording = await createRecording();
      await openCamera(newRecording.id);
      setRecording(newRecording);
    };

    startRecordingAsync();
  }, []);

  const [createRecord, { isLoading }] = useCreateRecordMutation();
  const [recordStatus] = useRecordStatusMutation();
  const [record, setRecord] = useState(false);
  const [pause, setPause] = useState(false);
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [recording, setRecording] = useState(null);
  const { snore, setSnore } = fetchSnoreCount();

  // Duration
  useEffect(() => {
    let interval;
    if (record && !pause) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [record, pause]);

  const startRecord = async () => {
    const response = await recordStatus({ recordStatus: "start" }).unwrap();

    try {
      if (!response.status) {
        throw new Error("Failed to connect");
      }

      await startRecording(recording.id);
      setRecord(true);
      setStartTime(new Date());
    } catch (err) {
      console.log("Error", err.message);
    }
  };

  const handlePause = async () => {
    try {
      const response = await recordStatus({
        recordStatus: pause ? "start" : "pause",
      }).unwrap();

      if (!response.status) {
        await pauseRecording();
        setPause(true);
      } else {
        await resumeRecording(recording.id);
        setPause(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const stopRecord = async () => {
    try {
      const response = await recordStatus({ recordStatus: "stop" }).unwrap();

      if (!response.status) {
        const recorded = await stopRecording(recording.id);
        const currentTime = new Date();
        const bedtime = formatTimeInAMPM(startTime);
        const wakeUp = formatTimeInAMPM(currentTime);
        const snoreCount = 0;

        const formData = new FormData();
        formData.append("bedtime", bedtime);
        formData.append("wakeUp", wakeUp);
        formData.append("sleepDuration", timer);
        formData.append("snoreCount", response.snoreCount);
        formData.append("video", recorded.blob, "session.webm");

        await createRecord(formData).unwrap();
        toast.success("Record Successfully");

        setRecord(false);
        setPause(false);
        setTimer(0);
        setWebcamReady(false);
      }
    } catch (err) {
      console.error("Unexpected Error", err);
      toast.error(err.data);
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="container">
        <div className="mt-4 mb-5">
          <h2>Sleep Session</h2>
          <p className="mb-0">
            Begin recording your sleep session with one tap.
          </p>
        </div>
        <div className="text-center">
          {activeRecordings.map((recording) => (
            <div key={recording.id}>
              <video ref={recording.webcamRef} />
            </div>
          ))}
          {record && (
            <div className="d-flex justify-content-center gap-5 mb-2 fs-5">
              <span>Sleep Duration: {formatTimer(timer)}</span>
              <span>Snore Count: {snore}</span>
            </div>
          )}
        </div>
        <div className="text-center my-3">
          {!record ? (
            <SessionButton action={startRecord} label={"Start"} />
          ) : (
            <div className="d-flex align-items-center justify-content-center gap-3">
              <div className="position-relative">
                {pause ? (
                  <SessionButton action={handlePause} label={"Resume"} />
                ) : (
                  <SessionButton action={handlePause} label={"Pause"} />
                )}
              </div>
              <SessionButton action={stopRecord} label={"Stop"} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Session;
