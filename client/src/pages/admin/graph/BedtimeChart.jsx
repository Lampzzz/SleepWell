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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState("");
  const [bedtimeData, setBedtimeData] = useState([
    { bedTime: "12 am", users: 0 },
    { bedTime: "1 am", users: 0 },
    { bedTime: "2 am", users: 0 },
    { bedTime: "3 am", users: 0 },
    { bedTime: "4 am", users: 0 },
    { bedTime: "5 am", users: 0 },
    { bedTime: "6 am", users: 0 },
    { bedTime: "7 am", users: 0 },
    { bedTime: "8 am", users: 0 },
    { bedTime: "9 am", users: 0 },
    { bedTime: "10 am", users: 0 },
    { bedTime: "11 am", users: 0 },
    { bedTime: "12 pm", users: 0 },
    { bedTime: "1 pm", users: 0 },
    { bedTime: "2 pm", users: 0 },
    { bedTime: "3 pm", users: 0 },
    { bedTime: "4 pm", users: 0 },
    { bedTime: "5 pm", users: 0 },
    { bedTime: "6 pm", users: 0 },
    { bedTime: "7 pm", users: 0 },
    { bedTime: "8 pm", users: 0 },
    { bedTime: "9 pm", users: 0 },
    { bedTime: "10 pm", users: 0 },
    { bedTime: "11 pm", users: 0 },
  ]);

  useEffect(() => {
    if (records.length === 0) return;

    const updatedBedtimeData = bedtimeData.map((time) => ({
      ...time,
      users: new Set(),
    }));

    const filteredRecords = records.filter((record) => {
      const recordDate = new Date(record.createdAt);
      const matchDate =
        recordDate.getFullYear() === selectedDate.getFullYear() &&
        recordDate.getMonth() === selectedDate.getMonth() &&
        recordDate.getDate() === selectedDate.getDate();
      const matchUser = selectedUser === "" || record.user._id === selectedUser; // Check if record matches selected user

      return matchDate && matchUser;
    });

    filteredRecords.forEach((record) => {
      if (record.bedtime) {
        const timeComponents = record.bedtime.split(":");
        const hour = parseInt(timeComponents[0]);
        let bedTime;

        if (hour >= 12) {
          bedTime = `${hour % 12} pm`;
        } else {
          bedTime = `${hour} am`;
        }

        const index = updatedBedtimeData.findIndex(
          (time) => time.bedTime === bedTime
        );

        if (index !== -1) {
          updatedBedtimeData[index].users.add(String(record.user._id));
        }
      }
    });

    const updatedCountData = updatedBedtimeData.map((time) => ({
      ...time,
      users: time.users.size,
    }));

    setBedtimeData(updatedCountData);
  }, [records, selectedDate, selectedUser]);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value); // Update selected user
  };

  return (
    <div className="col-12 mb-5 mb-lg-0">
      <div className="shadow-sm p-3 rounded-3 bg-white">
        <div className="d-flex align-items-center justify-content-between border-0 mb-3">
          <h6>User Bedtime Summary</h6>
          <div className="d-flex">
            <input
              type="date"
              className="form-control text-black-50"
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
            <select
              className="form-select ms-3 shadow-none "
              onChange={handleUserChange}
              value={selectedUser}
            >
              <option value="">All Users</option>
              {users
                .slice()
                .sort((a, b) => a.fullName.localeCompare(b.fullName))
                .map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.fullName}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart width={600} height={300} data={bedtimeData}>
            <XAxis dataKey="bedTime" />
            <YAxis domain={[1, users.length]} />
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
