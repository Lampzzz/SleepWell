import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { fetchUserDetail } from "../../services/api/fetchUserDetail";
import ProfileLink from "../../components/navbar/ProfileLink";
import NavbarLink from "../../components/navbar/NavbarLink";
import Logout from "../../components/dashboard/Logout";
import logo from "../../assets/image/logo.png";
import ReminderLink from "../../components/navbar/ReminderLink";
import UserSideBar from "../../components/navbar/UserSideBar";

const UserNavbar = () => {
  const { user } = fetchUserDetail();

  return (
    <>
      <nav className="navbar navbar-expand-lg px-0 px-lg-5 py-3 sticky-top bg-white border-bottom">
        <div className="container-fluid">
          <button
            className="navbar-toggler border-0 shadow-none "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <RxHamburgerMenu className="navbar-toggler-icon" />
          </button>
          <img src={logo} alt="Website Logo" id="logo" />
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto gap-3">
              <NavbarLink link="/user/dashboard" label="Dashboard" />
              <NavbarLink link="/user/session" label="Session" />
              <NavbarLink link="/user/record" label="Record" />
            </ul>
          </div>
          <div className="dropdown d-flex align-items-center">
            <div
              className="btn-group"
              data-bs-toggle="dropdown"
              data-bs-target="#userDropdown"
              style={{ cursor: "pointer" }}
            >
              <img
                src={`http://localhost:3000/images/${user.avatar}`}
                style={{ width: "45px", height: "45px" }}
                className="rounded-circle me-2"
              />
              <div className="d-none d-lg-block">
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column text-start">
                    <p className="mb-0">
                      {user.firstName + " " + user.lastName}
                    </p>
                    <small>{user.role}</small>
                  </div>
                  <IoIosArrowDown className="ms-2" />
                </div>
              </div>
            </div>
            <ul
              className="dropdown-menu dropdown-menu-end mt-3"
              aria-labelledby="userDropdown"
            >
              <ProfileLink to="/user/profile" />
              <ReminderLink to="/user/reminder" />
              <Logout />
            </ul>
          </div>
        </div>
      </nav>
      <UserSideBar />
    </>
  );
};

export default UserNavbar;
