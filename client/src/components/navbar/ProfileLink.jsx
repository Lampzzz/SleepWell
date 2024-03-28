import { LuUser2 } from "react-icons/lu";
import { Link } from "react-router-dom";

const ProfileLink = ({ to }) => {
  return (
    <li>
      <Link to={to} className="text-decoration-none">
        <button className="dropdown-item d-flex align-items-center">
          <LuUser2 className="me-2" />
          <p className="mb-0">Profile</p>
        </button>
      </Link>
    </li>
  );
};

export default ProfileLink;
