import ButtonLink from "../../../components/button/ButtonLink";
import aboutImg from "../../../assets/image/about--img.png";

const About = () => {
  const imgSize = {
    width: "350px",
    height: "300px",
  };

  return (
    <div className="container-fluid py-5 bg-white " id="about">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 col-lg-5 order-md-1 order-1 text-center mb-3 mb-lg-0">
          <img src={aboutImg} alt="about us image img-fluid" />
        </div>
        <div className="col-md-6 col-lg-5 order-2 order-md-2 px-5 px-md-0">
          <h2 className="mb-3">Welcome to SleepWell</h2>
          <p className="mb-3">
            SleepWell redefines sleep monitoring with an Arduino-based system
            that includes video recording, snore detection, and detailed
            analytics for a comprehensive understanding of your sleep health.
          </p>
          <ButtonLink
            link={"/about-us"}
            style={"btn btn-outline-primary"}
            label={"Learn More"}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
