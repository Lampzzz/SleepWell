import { useEffect, useState } from "react";
import {
  useGetAllUsersQuery,
  useGetAllAdminsQuery,
  useGetAllRecordsQuery,
} from "../redux/api/adminApiSlice";

export const fetchAllUser = () => {
  const { data, refetch, isLoading } = useGetAllUsersQuery();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    refetch();
    if (data) {
      setUsers(data);
    }
  }, [data, refetch]);

  return { users, refetch, isLoading };
};

export const fetchAllAdmin = () => {
  const { data, refetch, isLoading } = useGetAllAdminsQuery();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    refetch();
    if (data) {
      setAdmins(data);
    }
  }, [data, refetch]);

  return { admins, refetch, isLoading };
};

export const fetchAllRecord = () => {
  const { data, refetch, isLoading } = useGetAllRecordsQuery();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    refetch();
    if (data) {
      setRecords(data);
    }
  }, [data, refetch]);

  return { records, refetch, isLoading };
};
