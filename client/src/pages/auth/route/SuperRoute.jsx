import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const SuperRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.role == "Super Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default SuperRoute;
