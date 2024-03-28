import { Link } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import Features from "../home/Features";
import HowItWorks from "../home/HowItWorks";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid py-5 banner d-flex align-items-center">
        <div className="banner__content">
          <h1>About Us</h1>
          <div className="d-flex">
            <Link to="/" className="text-black-50 text-decoration-none">
              Home
            </Link>
            <span className="mx-1">/</span>
            <Link to="/about-us" className="text-black-50 text-decoration-none">
              About Us
            </Link>
          </div>
        </div>
      </div>
      <div className="cotainer-fluid bg-white">
        <div className="container my-5">
          <div className="text-center mb-5">
            <h1>SleepWell</h1>
          </div>

          <div className="d-flex">
            <p className="text-black-50">
              Welcome to SleepWell, where innovation meets a good night's sleep!
              At SleepWell, we are dedicated to revolutionizing the way
              individuals monitor and understand their sleep patterns. Our
              Arduino-based sleep monitoring system goes beyond traditional
              solutions, offering a comprehensive approach to sleep health. With
              features such as video recording, snore detection, and detailed
              sleep analytics, SleepWell provides users with valuable insights
              into their sleep quality, empowering them to make informed
              decisions for a healthier and more restful lifestyle. We believe
              that everyone deserves a good night's sleep, and SleepWell is here
              to make that a reality by combining cutting-edge technology with
              user-friendly interfaces.
              <br /> <br />
              At SleepWell, our mission is to make advanced sleep monitoring
              accessible and affordable. Our team of passionate developers and
              sleep enthusiasts has carefully designed a user-friendly web
              platform that seamlessly integrates with our Arduino-based
              hardware. Whether you're an individual seeking to enhance your
              sleep habits or an administrator overseeing a larger user base,
              SleepWell caters to your unique needs. We are driven by the desire
              to contribute to the growth of knowledge in information technology
              and the improvement of sleep health awareness. Join us on this
              journey towards a better night's sleep because when you sleep
              well, you live well.
            </p>
          </div>
        </div>
      </div>

      <Features />
      <HowItWorks />
      <Footer />
    </>
  );
};

export default AboutUs;
