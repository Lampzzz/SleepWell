import { Link, useLocation } from "react-router-dom";

const NavbarLink = ({ link, label }) => {
  const location = useLocation();

  return (
    <li className="nav-item py-1 py-lg-0">
      <Link
        to={link}
        className={`nav-link ${
          location.pathname === link
            ? "active--navbar fw-medium"
            : "text-black "
        }`}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavbarLink;
