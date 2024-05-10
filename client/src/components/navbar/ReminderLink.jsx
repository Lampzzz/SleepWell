import { FaRegClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const ReminderLink = ({ to }) => {
  return (
    <li>
      <Link to={to} className="text-decoration-none">
        <button className="dropdown-item d-flex align-items-center">
          <FaRegClock className="me-2" />
          <p className="mb-0">Reminder</p>
        </button>
      </Link>
    </li>
  );
};

export default ReminderLink;
