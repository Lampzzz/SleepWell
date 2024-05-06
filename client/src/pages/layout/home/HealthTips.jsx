import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import image1 from "../../../assets/image/tip--1.jpg";
import image2 from "../../../assets/image/tip--2.jpg";
import image3 from "../../../assets/image/tip--3.jpg";
import image4 from "../../../assets/image/tip--4.jpg";

const HealthTips = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const tips = [
    {
      image: image1,
      title: "Establish a Relaxing Pre-Sleep Routine",
      description: `Wind down before bedtime with calming activities like reading or
      practicing mindfulness to promote a restful night's sleep.`,
    },
    {
      image: image2,
      title: "Maintain a Consistent Sleep Schedule",
      description: `Stick to a regular sleep-wake cycle to regulate your body's
      internal clock, optimizing sleep quality and overall well-being.`,
    },
    {
      image: image3,
      title: "Limit Screen Time Before Bed",
      description: `Reduce screen exposure an hour before bedtime to improve sleep by minimizing the impact of blue light on melatonin production and fostering a conducive environment for rest.`,
    },
    {
      image: image4,
      title: "Create a Comfortable Sleep Environment",
      description: `Optimize sleep quality with a cool, quiet, and comfortable
    environment, including a supportive mattress and minimal light.`,
    },
  ];

  return (
    <div className="container-fluid py-5 bg-light " id="tips">
      <div className="text-center mb-5">
        <h2>Health Tips</h2>
        <p>Discover expert tips for better sleep and overall well-being</p>
      </div>

      <div className="container mx-auto py-3 health__tips">
        <Slider {...settings}>
          {tips.map((tip, index) => (
            <div key={index} className="px-3 py-3 px-sm-3">
              <div className="card border-0 rounded-4">
                <div className="overflow-hidden rounded-top-4  ">
                  <img src={tip.image} className="card-img-top" />
                </div>
                <div className="card-body rounded-bottom-4 ">
                  <h5 className="card-title">{tip.title}</h5>
                  <small className="card-text">{tip.description}</small>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HealthTips;
