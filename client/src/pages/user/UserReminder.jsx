import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import ButtonAction from "../../components/button/ButtonAction";
import PageTitle from "../../components/dashboard/PageTitle";
import UserNavbar from "./UserNavbar";
import { useCreateReminderMutation } from "../../services/redux/api/userApiSlice";
import { fetchReminder } from "../../services/api/fetchReminder";
import alarmSound from "../../assets/sound/alarm.mp3";

const UserReminder = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [meridiem, setMeridiem] = useState("pm");
  const [createReminder, { isLoading }] = useCreateReminderMutation();
  const { reminder } = fetchReminder();
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioAlarm = new Audio(alarmSound);

  useEffect(() => {
    if (reminder) {
      setHour(reminder.hour);
      setMinute(reminder.minute);
      setMeridiem(reminder.meridiem);
    }
  }, [reminder]);

  const incrementHour = () => {
    setHour((prevHour) => (prevHour % 12) + 1);
  };

  const decrementHour = () => {
    setHour((prevHour) => (prevHour - 1 + 12) % 12 || 12);
  };

  const incrementMinute = () => {
    setMinute((prevMinute) => (prevMinute + 1) % 60);
  };

  const decrementMinute = () => {
    setMinute((prevMinute) => (prevMinute - 1 + 60) % 60);
  };

  const toggleMeridiem = () => {
    setMeridiem((prevMeridiem) => (prevMeridiem === "am" ? "pm" : "am"));
  };

  const handleSubmit = async () => {
    try {
      await createReminder({ hour, minute, meridiem }).unwrap();
      toast.success("Set Reminder Succesfully");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleReset = () => {
    setHour(0);
    setMinute(0);
  };

  const startAlarm = () => {
    // console.log("Audio is Playing");

    toast("It's time to sleep well", {
      position: "bottom-right",
      autoClose: false,
      onClose: () => stopAlarm(),
    });

    audioAlarm.loop = true;
    audioAlarm.play();
    setAudio(audioAlarm);
  };

  const stopAlarm = () => {
    // console.log("Audio Stopped");

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const alarmNotif = () => {
    const currentTime = new Date();
    const reminderTime = new Date(currentTime);

    if (meridiem === "pm") {
      reminderTime.setHours(hour + 12);
    } else {
      reminderTime.setHours(hour);
    }

    reminderTime.setMinutes(minute);

    // console.log(`Current Time: ${currentTime.getMinutes()}`);
    // console.log(`Reminder Time: ${reminderTime.getMinutes()}`);

    if (
      reminderTime.getHours() === currentTime.getHours() &&
      reminderTime.getMinutes() === currentTime.getMinutes()
    ) {
      if (audio && !audio.paused) {
        return;
      }

      startAlarm();
    } else {
      stopAlarm();
    }
  };

  useEffect(() => {
    alarmNotif();
  }, [hour, minute, meridiem]);

  return (
    <>
      <UserNavbar />
      <div className="container">
        <PageTitle
          title={"Reminder"}
          subtitle={"Set your account settings down below"}
        />
        <div className="d-flex align-items-center justify-content-center ">
          {/* Hour */}
          <div className="d-flex flex-column align-items-center ">
            <IoIosArrowUp
              size={30}
              onClick={incrementHour}
              className="reminder__arrow"
            />
            <div className="bg-white p-3 d-inline shadow-sm rounded-3 display-1 my-3">
              {hour < 10 ? "0" + hour : hour}
            </div>
            <IoIosArrowDown
              size={30}
              onClick={decrementHour}
              className="reminder__arrow"
            />
          </div>

          <div className="mx-3 display-1 ">:</div>

          {/* Minute */}
          <div className="d-flex flex-column align-items-center ">
            <IoIosArrowUp
              size={30}
              onClick={incrementMinute}
              className="reminder__arrow"
            />
            <div className="bg-white p-3 d-inline shadow-sm rounded-3 display-1 my-3">
              {minute < 10 ? "0" + minute : minute}
            </div>
            <IoIosArrowDown
              size={30}
              onClick={decrementMinute}
              className="reminder__arrow"
            />
          </div>

          {/* AM / PM */}
          <div className="d-flex flex-column">
            <div
              className={`reminder__arrow p-3 ms-3 d-inline rounded-3 ${
                meridiem === "pm" ? "bg-white shadow-sm" : ""
              }`}
              onClick={toggleMeridiem}
            >
              PM
            </div>
            <div
              className={`reminder__arrow p-3 ms-3 d-inline rounded-3 ${
                meridiem === "am" ? "bg-white shadow-sm" : ""
              }`}
              onClick={toggleMeridiem}
            >
              AM
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <ButtonAction
          style={"btn btn-outline-primary mt-4 mb-3 d-inline me-3"}
          type={"button"}
          label={"Reset"}
          handleClick={handleReset}
        />
        <ButtonAction
          style={"btn btn-primary mt-4 mb-3 d-inline"}
          type={"button"}
          label={"Save"}
          handleClick={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default UserReminder;
