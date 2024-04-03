import { useEffect, useState } from "react";
import { useGetSnoreQuery } from "../redux/api/recordApiSlice";

export const fetchSnoreCount = () => {
  const { data, refetch, isLoading } = useGetSnoreQuery();
  const [snore, setSnore] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  useEffect(() => {
    if (data) {
      setSnore(data.snoreCount);
    }
  }, [data]);

  return { snore, setSnore };
};
