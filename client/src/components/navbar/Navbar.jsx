import { RxHamburgerMenu } from "react-icons/rx";
import NavbarLink from "./NavbarLink";
import ButtonLink from "../button/ButtonLink";
import logo from "../../assets/image/logo.png";

const Navbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg px-3 px-md-5 py-3 sticky-top bg-white border-bottom"
        id="navbar"
      >
        <div className="container-fluid">
          <img src={logo} alt="Website Logo" id="logo" />
          <button
            className="navbar-toggler border-0 shadow-none "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <RxHamburgerMenu className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mt-3 mt-lg-0 mb-2 mb-lg-0 mx-auto gap-3">
              <NavbarLink link="/" label="Home" />
              <NavbarLink link="/about-us" label="About" />
              <NavbarLink link="/contact-us" label="Contact" />
              <NavbarLink link="/freq-question" label="FAQ" />
            </ul>
            <hr />
            <ButtonLink
              style={"btn btn-outline-primary me-3 px-4"}
              link={"/login"}
              label={"Login"}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
