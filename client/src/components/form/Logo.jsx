import { Link } from "react-router-dom";
import logo from "../../assets/image/logo.png";

const Logo = () => {
  return (
    <div className="text-center">
      <Link to="/">
        <img src={logo} className="mb-5 auth__img" />
      </Link>
    </div>
  );
};

export default Logo;
