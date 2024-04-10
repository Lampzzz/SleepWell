import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchUserRecord } from "../../../services/api/fetchUserRecord";

const DurationChart = () => {
  const { records } = fetchUserRecord();
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [sleepData, setSleepData] = useState([
    { day: "Mon", date: "", sleepDuration: 0 },
    { day: "Tue", date: "", sleepDuration: 0 },
    { day: "Wed", date: "", sleepDuration: 0 },
    { day: "Thu", date: "", sleepDuration: 0 },
    { day: "Fri", date: "", sleepDuration: 0 },
    { day: "Sat", date: "", sleepDuration: 0 },
    { day: "Sun", date: "", sleepDuration: 0 },
  ]);

  useEffect(() => {
    if (records.length > 0) {
      const filteredRecords = records.filter(
        (record) => record.week === `Week ${selectedWeek + 1}`
      );

      const updatedSleepData = [...sleepData].map((dayData) => ({
        ...dayData,
        sleepDuration: 0,
      }));

      filteredRecords.forEach((record) => {
        const createdAtDate = new Date(record.createdAt);
        const dayIndex = createdAtDate.getDay();
        const totalDurationSeconds = parseInt(record.sleepDuration);
        const totalDurationHours = Math.floor(totalDurationSeconds / 3600);

        updatedSleepData[dayIndex - 1] = {
          ...updatedSleepData[dayIndex - 1],
          date: createdAtDate.toLocaleDateString(),
          sleepDuration:
            updatedSleepData[dayIndex - 1].sleepDuration + totalDurationHours,
        };
      });

      setSleepData(updatedSleepData);
    }
  }, [records, selectedWeek]);

  useEffect(() => {
    const weekNumbers = records.map((record) =>
      parseInt(record.week.split(" ")[1])
    );

    const latestWeek = Math.max(...weekNumbers);
    setSelectedWeek(latestWeek - 1);
  }, [records]);

  const handleWeekChange = (event) => {
    setSelectedWeek(parseInt(event.target.value));
  };

  const uniqueWeeks = Array.from(new Set(records.map((record) => record.week)));
  const weekOptions = uniqueWeeks.map((week, index) => (
    <option key={index} value={index}>
      {week}
    </option>
  ));

  return (
    <div className="col-12 col-lg-6 mb-5 mb-lg-0">
      <div className="shadow-sm p-3 rounded-3 bg-white">
        <div className="d-flex align-items-center justify-content-between border-0 mb-3">
          <h6>Sleep Duration Summary</h6>
          {records.length > 0 ? (
            <select
              name="filterWeek"
              className="py-1 px-3 border-dark-subtle "
              onChange={handleWeekChange}
              value={selectedWeek}
            >
              {weekOptions}
            </select>
          ) : null}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={600} height={300} data={sleepData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => [
                `Hour: ${value}`,
                `Date: ${props.payload.date}`,
              ]}
            />
            <Bar dataKey="sleepDuration" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DurationChart;
