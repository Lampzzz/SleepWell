import { Link, useLocation } from "react-router-dom";

const ProfileBtn = ({ to, label }) => {
  const location = useLocation();

  return (
    <div className="p-3">
      <Link
        to={to}
        className={`text-decoration-none px-5 py-2 bg-white ${
          location.pathname === to
            ? "shadow-sm border rounded-3 text-primary "
            : " border rounded-3 text-black-50"
        }`}
      >
        {label}
      </Link>
    </div>
  );
};

export default ProfileBtn;
