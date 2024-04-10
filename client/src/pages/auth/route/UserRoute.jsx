import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.role == "User" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default UserRoute;
