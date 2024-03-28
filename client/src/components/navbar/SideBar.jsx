import { Link } from "react-router-dom";

// Component Import
import SideNavLink from "../dashboard/SideNavLink";

const SideBar = () => {
  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <img src="../logo.png" alt="Website Logo" id="logo" />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto gap-3">
            <SideNavLink to="/" label="Home" />
            <SideNavLink to="/about-us" label="About Us" />
            <SideNavLink to="/contact-us" label="Contact" />
            <SideNavLink to="/freq-question" label="FAQ" />
          </ul>
          <hr className="opacity-25" />
          <div className="mt-3 text-center">
            <Link to="/login">
              <button className="btn btn-outline-primary me-3" type="submit">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
