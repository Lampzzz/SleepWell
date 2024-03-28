import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const fetchUserDetail = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [userInfo]);

  return { user, setUser };
};
