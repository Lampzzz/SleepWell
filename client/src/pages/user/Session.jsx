import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import Webcam from "react-webcam";
import UserNavbar from "./UserNavbar";
import SessionButton from "../../components/button/SessionButton";
import { useCreateRecordMutation } from "../../services/redux/api/recordApiSlice";
import { formatTimer, formatTimeInAMPM } from "../../utils/formatTime";

const Session = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [createRecord, { isLoading }] = useCreateRecordMutation();
  const [record, setRecord] = useState(false);
  const [pause, setPause] = useState(false);
  const [webcamReady, setWebcamReady] = useState(true);
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(null);

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

  const startRecord = useCallback(() => {
    setRecord(true);
    setStartTime(new Date());

    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setRecord, mediaRecorderRef]);

  const handlePause = () => {
    setPause(!pause);
  };

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const stopRecord = useCallback(async () => {
    try {
      mediaRecorderRef.current.stop();
      const currentTime = new Date();
      const bedtime = formatTimeInAMPM(startTime);
      const wakeUp = formatTimeInAMPM(currentTime);
      const sleepDuration = timer;
      const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
      const recordedFile = new File([recordedBlob], "session.mp4", {
        type: "video/webm",
      });

      const formData = new FormData();
      formData.append("bedtime", bedtime);
      formData.append("wakeUp", wakeUp);
      formData.append("sleepDuration", sleepDuration);
      formData.append("video", recordedFile);

      await createRecord(formData).unwrap();
      toast.success("Record Successfully");

      setRecord(false);
      setPause(false);
      setTimer(0);
    } catch (err) {
      console.error("Unexpected Error", err);
      toast.error(err.data);
    }
  }, [mediaRecorderRef, recordedChunks, createRecord, startTime, timer]);

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
          {webcamReady ? (
            <Webcam audio={true} ref={webcamRef} />
          ) : (
            <div
              className="mx-auto bg-white w-50 p-5 rounded-3 shadow-sm "
              style={{ height: "400px" }}
            ></div>
          )}
          {record ? (
            <div className="d-flex justify-content-center gap-5 mb-2 fs-5">
              <span>Sleep Duration: {formatTimer(timer)}</span>
              <span>Snore Count: </span>
            </div>
          ) : (
            ""
          )}
        </div>
        {webcamReady ? (
          <div className="text-center my-3">
            {!record ? (
              <SessionButton action={startRecord} label={"play"} />
            ) : (
              <div className="d-flex align-items-center justify-content-center gap-3">
                <div className="position-relative">
                  {pause ? (
                    <SessionButton action={handlePause} label={"play"} />
                  ) : (
                    <SessionButton action={handlePause} label={"pause"} />
                  )}
                </div>
                <SessionButton action={stopRecord} label={"stop"} />
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Session;
