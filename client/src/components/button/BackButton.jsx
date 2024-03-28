import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const BackButton = ({ to }) => {
  return (
    <div className="mt-4 mb-3 d-flex align-items-center ">
      <Link to={to}>
        <button className="btn fs-5 border-0 ">
          <IoIosArrowBack size={25} />
          <span>Back</span>
        </button>
      </Link>
    </div>
  );
};

export default BackButton;
