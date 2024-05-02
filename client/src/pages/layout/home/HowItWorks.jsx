import step1 from "assets/image/step1.jpg";
import step2 from "assets/image/step2.jpg";
import step3 from "assets/image/step3.jpg";

const HowItWorks = () => {
  return (
    <div className="container-fluid py-5 bg-white" id="works">
      <div className="text-center mb-5">
        <h2>How it works?</h2>
        <p>
          Setup, monitor, and analyze your sleep effortlessly with SleepWell.
        </p>
      </div>
      <div className="container">
        <div className="row mb-5 d-flex align-items-center">
          <div className="col-12 col-lg-5 mx-auto order-2 order-lg-1">
            <div className="d-flex justify-content-center flex-column">
              <h4>Setup and Account Creation</h4>
              <p className="mb-0 text-black-50 ">
                Place your SleepWell station in your bedroom and create a
                personalized account on our web platform. Tailor your
                preferences for a customized sleep monitoring experience.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-5 mx-auto order-1 order-lg-2 mb-3 mb-lg-0">
            <div className="d-flex justify-content-center">
              <img src={step1} className="rounded-4" alt="" />
            </div>
          </div>
        </div>
        <div className="row mb-5 d-flex align-items-center">
          <div className="col-12 col-lg-5 mx-auto mb-3 mb-lg-0">
            <div className="d-flex justify-content-center">
              <img src={step2} className="rounded-4" alt="" />
            </div>
          </div>
          <div className="col-12 col-lg-5 mx-auto">
            <div className="d-flex justify-content-center flex-column">
              <h4>Initiate Your Sleep Session</h4>
              <p className="mb-0 text-black-50 ">
                Start, pause, and stop your sleep session effortlessly through
                the platform. SleepWell records your sleep duration, analyzes
                snoring, and captures video footage, giving you control over
                your monitoring experience.
              </p>
            </div>
          </div>
        </div>
        <div className="row mb-5 d-flex align-items-center">
          <div className="col-12 col-lg-5 mx-auto order-2 order-lg-1">
            <div className="d-flex justify-content-center flex-column">
              <h4>Accessible Sleep Data</h4>
              <p className="mb-0 text-black-50 ">
                Wake up to a detailed overview of your sleep health. Access your
                sleep data easily, review videos, track patterns, and make
                informed decisions about your sleep habits. SleepWell's
                user-friendly design ensures continuous improvement for a
                restful night's sleep.
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-5 mx-auto order-1 order-lg-2 mb-3 mb-lg-0">
            <div className="d-flex justify-content-center">
              <img src={step3} className="rounded-4" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
