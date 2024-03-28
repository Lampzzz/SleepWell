import ButtonLink from "../../../components/button/ButtonLink";

const Banner = () => {
  return (
    <div className="container-fluid px-2 d-flex align-items-center banner">
      <div className="banner__content">
        <h1 className="fw-bold">
          Revolutionize Your Sleep <br /> Journey with
          <span className="main--color"> SleepWell</span>
        </h1>
        <p>
          Transform the way you sleep by monitoring and <br /> understanding
          your sleep patterns like never before.
        </p>
        <ButtonLink
          link={"/login"}
          style={"btn btn-primary"}
          label={"Get Started"}
        />
      </div>
    </div>
  );
};

export default Banner;
