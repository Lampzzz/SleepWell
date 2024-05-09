import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiZzzFill } from "react-icons/ri";
import { FaVideo } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      title: "Video Insight",
      description:
        "Capture your sleep journey with high-quality video recording, gaining valuable insights into your nightly rest patterns.",
      icon: <FaVideo color="#0d6efd" size={40} className="mb-2" />,
    },
    {
      title: "Snore Detection",
      description:
        "Audio algorithms detect and timestamp snoring events, providing a comprehensive understanding of sleep quality.",
      icon: <RiZzzFill color="#0d6efd" size={40} className="mb-2" />,
    },
    {
      title: "Sleep Duration Insights",
      description:
        "Integrated sensors monitor sleep onset and awakening, providing accurate measurements for a detailed sleep duration analysis.",
      icon: <FaClock color="#0d6efd" size={40} className="mb-2" />,
    },
  ];

  return (
    <div className="container-fluid px-5 bg-white" id="features">
      <div className="text-center mb-5">
        <h2>Features</h2>
        <p>
          Explore SleepWell's standout features for an sleep monitoring
          experience
        </p>
      </div>
      <div className="row justify-content-center">
        {features.map((feature, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-5 mb-lg-0">
            <div className="feature__item text-center py-5 px-4 rounded-4">
              <div className="mb-3">{feature.icon}</div>
              <h5>{feature.title}</h5>
              <small>{feature.description}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
