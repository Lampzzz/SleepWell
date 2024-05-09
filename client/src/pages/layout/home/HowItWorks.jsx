import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaLaptop } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { GoGraph } from "react-icons/go";

const HowItWorks = () => {
  return (
    <div className="container-fluid px-5 bg-light" id="works">
      <div className="text-center mb-5">
        <h2>How it works?</h2>
        <p>
          Setup, monitor, and analyze your sleep effortlessly with SleepWell.
        </p>
      </div>
      <VerticalTimeline lineColor={"white"} animate={true}>
        <VerticalTimelineElement
          date="Step 1"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<FaLaptop />}
        >
          <div className="d-flex justify-content-center flex-column">
            <h4>Setup and Account Creation</h4>
            <p className="mb-0 text-black-50 ">
              Place your SleepWell station in your bedroom and create a
              personalized account on our web platform. Tailor your preferences
              for a customized sleep monitoring experience.
            </p>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          date="Step 2"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<GiNightSleep />}
        >
          <div className="d-flex justify-content-center flex-column">
            <h4>Initiate Your Sleep Session</h4>
            <p className="mb-0 text-black-50 ">
              Start, pause, and stop your sleep session effortlessly through the
              platform. SleepWell records your sleep duration, analyzes snoring,
              and captures video footage, giving you control over your
              monitoring experience.
            </p>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          date="Step 3"
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          icon={<GoGraph />}
        >
          <div className="d-flex justify-content-center flex-column">
            <h4>Accessible Sleep Data</h4>
            <p className="mb-0 text-black-50 ">
              Wake up to a detailed overview of your sleep health. Access your
              sleep data easily, review videos, track patterns, and make
              informed decisions about your sleep habits. SleepWell's
              user-friendly design ensures continuous improvement for a restful
              night's sleep.
            </p>
          </div>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default HowItWorks;
