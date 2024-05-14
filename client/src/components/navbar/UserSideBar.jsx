import React, { useEffect } from "react";
import NavbarLink from "./NavbarLink";
import logo from "../../assets/image/logo.png";

const SideBar = () => {
  useEffect(() => {
    const offcanvasElement = document.getElementById("offcanvasExample");
    const navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navbarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (offcanvasElement.classList.contains("show")) {
          offcanvasElement.classList.remove("show");
        }
      });
    });

    return () => {
      navbarLinks.forEach((link) => {
        link.removeEventListener("click", () => {
          if (offcanvasElement.classList.contains("show")) {
            offcanvasElement.classList.remove("show");
          }
        });
      });
    };
  }, []);

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <img src={logo} alt="Website Logo" id="logo" />
          <button
            type="button"
            className="btn-close border-0 shadow-none "
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto gap-3">
            <NavbarLink link="/user/dashboard" label="Dashboard" />
            <NavbarLink link="/user/session" label="Session" />
            <NavbarLink link="/user/record" label="Record" />
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
