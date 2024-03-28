import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Redux Import
import { useLogoutMutation } from "../../services/redux/api/authApiSlice";
import { logout } from "../../services/redux/slice/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutAPICall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutAPICall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <li>
      <button
        onClick={handleLogout}
        className="dropdown-item d-flex align-items-center"
      >
        <LuLogOut className="me-2" />
        <p className="mb-0">Logout</p>
      </button>
    </li>
  );
};

export default Logout;
