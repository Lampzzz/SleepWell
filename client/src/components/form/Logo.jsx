import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="text-center">
      <Link to="/">
        <img src="src/assets/image/logo.png" className="mb-5 auth__img" />
      </Link>
    </div>
  );
};

export default Logo;
