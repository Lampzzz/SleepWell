import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  fetchAllUser,
  fetchAllRecord,
} from "../../../services/api/fetchAllData";

const BedtimeChart = () => {
  const { users } = fetchAllUser();
  const { records } = fetchAllRecord();
  const [selectedDate, setSelectedDate] = useState(null);
  const [bedtimeData, setBedtimeData] = useState([
    { sleepTime: "7 pm", users: 0, bedTime: 0, usersCount: 0 },
    { sleepTime: "8 pm", users: 0, bedTime: 0, usersCount: 0 },
    { sleepTime: "9 pm", users: 0, bedTime: 0, usersCount: 0 },
    { sleepTime: "10 pm", users: 0, bedTime: 0, usersCount: 0 },
    { sleepTime: "11 pm", users: 0, bedTime: 0, usersCount: 0 },
    { sleepTime: "12 am", users: 0, bedTime: 0, usersCount: 0 },
    { sleepTime: "1 am", users: 0, bedTime: 0, usersCount: 0 },
    { sleepTime: "2 am", users: 0, bedTime: 0, usersCount: 0 },
    { sleepTime: "3 am", users: 0, bedTime: 0, usersCount: 0 },
    { sleepTime: "4 am", users: 0, bedTime: 0, usersCount: 0 },
    { sleepTime: "5 am", users: 0, bedTime: 0, usersCount: 0 },
  ]);

  useEffect(() => {
    if (records && records.length > 0) {
      const bedtimeMap = new Map();

      // Count users for each bedtime
      records.forEach((record) => {
        const bedtime = record.bedtime;
        const usersCount = bedtimeMap.has(bedtime)
          ? bedtimeMap.get(bedtime) + 1
          : 1;
        bedtimeMap.set(bedtime, usersCount);
      });

      // Convert map to array for chart data
      const bedtimeChartData = Array.from(bedtimeMap).map(
        ([sleepTime, usersCount]) => ({
          sleepTime,
          users: users.filter((user) =>
            records.some(
              (record) =>
                record.bedtime === sleepTime && record.user._id === user._id
            )
          ).length,
          usersCount,
        })
      );

      setBedtimeData(bedtimeChartData);
    }
  }, [records, users]);

  return (
    <div className="col-12 col-lg-6 mb-5 mb-lg-0">
      <div className="shadow-sm p-3 rounded-3 bg-white">
        <div className="d-flex align-items-center justify-content-between border-0 mb-3">
          <h6>User Bedtime Summary</h6>
          <div className="d-flex">
            <input
              type="date"
              className="form-control text-black-50"
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart width={600} height={300} data={bedtimeData}>
            <XAxis dataKey="sleepTime" />
            <YAxis dataKey="users" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ stroke: "#82ca9d", fill: "#82ca9d" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BedtimeChart;
