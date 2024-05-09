import ButtonLink from "../../../components/button/ButtonLink";
import headerImage from "../../../assets/image/hero--img.png";

const Banner = () => {
  return (
    <div className="container-fluid bg-light py-5">
      <div className="row align-items-center ">
        <div className="col-12 col-lg-6 order-2 order-lg-1">
          <div className="d-flex flex-column ms-5">
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
        <div className="col-12 col-lg-6 text-center order-lg-2 mb-5 mb-lg-0">
          <img
            src={headerImage}
            alt=""
            className="img-fluid"
            style={{ height: "450px", width: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
