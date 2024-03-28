import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import About from "./About";
import Banner from "./Banner";
import Features from "./Features";
import HealthTips from "./HealthTips";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Features />
      <About />
      <HealthTips />
      <HowItWorks />
      <Footer />
    </>
  );
};

export default Home;
