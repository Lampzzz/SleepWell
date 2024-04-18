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

  const [createRecord, { isLoading }] = useCreateRecordMutation();
  const [recordStatus] = useRecordStatusMutation();
  const [record, setRecord] = useState(false);
  const [pause, setPause] = useState(false);
  const [webcamReady, setWebcamReady] = useState(false);
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [recording, setRecording] = useState(null);

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

  const handleOpenCamera = async () => {
    const newRecording = await createRecording();
    await openCamera(newRecording.id);
    setRecording(newRecording);
    setWebcamReady(true);
  };

  const startRecord = async () => {
    try {
      // const newRecording = await createRecording();
      await startRecording(recording.id);
      // setRecording(newRecording);
      setRecord(true);
      setStartTime(new Date());
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Failed to start recording.");
    }
  };

  const handlePause = async () => {
    try {
      if (pause) {
        await resumeRecording(recording.id);
      } else {
        await pauseRecording();
      }
      setPause((prevPause) => !prevPause);
    } catch (error) {
      console.error("Error toggling pause:", error);
      toast.error("Failed to pause recording.");
    }
  };

  const stopRecord = async () => {
    try {
      const recorded = await stopRecording(recording.id);
      const currentTime = new Date();
      const bedtime = formatTimeInAMPM(startTime);
      const wakeUp = formatTimeInAMPM(currentTime);
      const snoreCount = 0;
      const sleepDuration = timer;

      const formData = new FormData();
      formData.append("bedtime", bedtime);
      formData.append("wakeUp", wakeUp);
      formData.append("sleepDuration", sleepDuration);
      formData.append("snoreCount", snoreCount);
      formData.append("video", recorded.blob, "session.webm");

      await createRecord(formData).unwrap();
      toast.success("Record Successfully");

      setRecord(false);
      setPause(false);
      setTimer(0);
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
        {!webcamReady && (
          <div className="text-center mt-5 pt-5">
            <button className="btn btn-primary " onClick={handleOpenCamera}>
              Open Camera
            </button>
          </div>
        )}
        <div className="text-center">
          {webcamReady &&
            activeRecordings.map((recording) => (
              <div key={recording.id}>
                <video ref={recording.webcamRef} />
              </div>
            ))}
          {record && (
            <div className="d-flex justify-content-center gap-5 mb-2 fs-5">
              <span>Sleep Duration: {formatTimer(timer)}</span>
              <span>Snore Count: </span>
            </div>
          )}
        </div>
        {webcamReady && (
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
        )}
      </div>
    </>
  );
};

export default Session;
