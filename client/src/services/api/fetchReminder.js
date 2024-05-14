import { useEffect, useState } from "react";
import { useGetReminderQuery } from "../redux/api/userApiSlice";

export const fetchReminder = () => {
  const { data, refetch, isLoading } = useGetReminderQuery();
  const [reminder, setReminder] = useState(null);

  useEffect(() => {
    refetch();
    if (data) {
      setReminder({
        hour: data.hour,
        minute: data.minute,
        meridiem: data.meridiem,
      });
    }
  }, [data, refetch]);

  return { reminder };
};
