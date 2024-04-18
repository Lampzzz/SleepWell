import { useState, useEffect, useRef } from "react";
import { useRecordWebcam } from "react-record-webcam";
import { toast } from "react-toastify";
import UserNavbar from "./UserNavbar";
import Webcam from "react-webcam";
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
    const delay = setTimeout(() => {
      setWebcamReady(true);
    }, 1000); // Delay of 1 second

    return () => clearTimeout(delay);
  }, []);

  const [createRecord, { isLoading }] = useCreateRecordMutation();
  const [recordStatus] = useRecordStatusMutation();
  const [record, setRecord] = useState(false);
  const webcamRef = useRef(null);
  const [pause, setPause] = useState(false);
  const [webcamReady, setWebcamReady] = useState(false);
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
    const newRecording = await createRecording();

    // setTimeout(async () => {
    //   await openCamera(newRecording.id);
    // }, 100);
    await openCamera(newRecording.id);
    await startRecording(newRecording.id);
    setRecording(newRecording);
    setRecord(true);
    setStartTime(new Date());
  };

  const handlePause = async () => {
    if (!pause) {
      await pauseRecording();
      setPause(true);
    } else {
      await resumeRecording(recording.id);
      setPause(false);
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
      setWebcamReady(false);
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
          {!record && <Webcam audio={false} ref={webcamRef} />}
        </div>
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
              <span>Snore Count: 0</span>
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
