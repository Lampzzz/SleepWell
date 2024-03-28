import { useEffect, useState } from "react";
import { useGetRecordsQuery } from "../../services/redux/api/recordApiSlice";

export const fetchUserRecord = () => {
  const { data, refetch, isLoading } = useGetRecordsQuery();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    refetch();
    if (data) {
      setRecords(data);
    }
  }, [data, refetch]);

  return { records, refetch, isLoading };
};
