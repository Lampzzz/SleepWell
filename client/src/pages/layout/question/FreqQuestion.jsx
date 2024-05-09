import { Link } from "react-router-dom";

// Component Import
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import AccordionItem from "./AccordionItem";

const FreqQuestion = () => {
  const accordionData = [
    {
      id: 1,
      title: "What sensors does SleepWell use to monitor sleep duration?",
      content:
        "SleepWell utilizes a combination of sensors, including audio sensors for snore detection and an Webcam for video recording. These sensors work together to provide comprehensive data on sleep duration and related metrics.",
    },
    {
      id: 2,
      title: "Can I view and analyze my recorded sleep videos?",
      content:
        "Yes, SleepWell offers a user-friendly web interface that allows you to access and analyze your recorded sleep videos. The platform provides a convenient way to review your sleep sessions, helping you gain valuable insights into your sleep patterns.",
    },
    {
      id: 3,
      title:
        "How accurate is the snore detection feature, and are there any limitations?",
      content:
        "The accuracy of the snore detection feature may vary based on environmental factors and sensor sensitivity. Factors such as the presence of other individuals in proximity during sleep sessions can introduce interference. While SleepWell strives for precision, users should be aware of these potential limitations.",
    },
    {
      id: 4,
      title:
        "What measures are taken to address potential storage shortages due to video recordings?",
      content:
        " SleepWell considers the issue of potential storage shortages due to large video file sizes. Careful management of storage resources is implemented to ensure efficient storage usage. Users can also be proactive in managing their recorded sleep sessions to optimize available storage space.",
    },
    {
      id: 5,
      title:
        "Does SleepWell support multiple users, and how does it handle shared sleeping spaces?",
      content:
        "SleepWell allows multiple users within a household with individual accounts. However, shared sleeping spaces may introduce interferences, such as snoring from others. While SleepWell minimizes these influences through advanced algorithms, users should be aware that external factors can impact individual sleep metrics. Consider strategic device placement or opt for individual monitoring in shared spaces for more accurate results.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container-fluid py-5 d-flex align-items-center bg-light">
        <div className="px-5">
          <h1>FAQ</h1>
          <div className="d-flex">
            <Link to="/" className="text-black-50 text-decoration-none">
              Home
            </Link>
            <span className="mx-1">/</span>
            <Link to="/about-us" className="text-black-50 text-decoration-none">
              FAQ
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-white ">
        <div className="container my-5">
          <div className="text-center mb-5">
            <h1>Frequently Asked Question</h1>
            <p className="mb-0 text-black-50">
              Explore common queries and find answers to better understand
              SleepWell.
            </p>
          </div>
          <div className="accordion row" id="accordionFlushExample">
            <div className="col-12 col-sm-11 col-md-9 mx-auto">
              {accordionData.map((item) => (
                <AccordionItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FreqQuestion;
