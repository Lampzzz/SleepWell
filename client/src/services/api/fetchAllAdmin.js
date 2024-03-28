import { useEffect, useState } from "react";
import { useGetAllAdminQuery } from "../redux/api/superAdminApiSlice";

export const fetchAllAdmin = () => {
  const { data, refetch, isLoading } = useGetAllAdminQuery();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    refetch();
    if (data) {
      setAdmins(data);
    }
  }, [data, refetch]);

  return { admins, refetch, isLoading };
};
