import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchUserRecord } from "../../../services/api/fetchUserRecord";

const SnoreChart = () => {
  const { records } = fetchUserRecord();
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [sleepData, setSleepData] = useState([
    { day: "Mon", date: "", snoreCount: 0 },
    { day: "Tue", date: "", snoreCount: 0 },
    { day: "Wed", date: "", snoreCount: 0 },
    { day: "Thu", date: "", snoreCount: 0 },
    { day: "Fri", date: "", snoreCount: 0 },
    { day: "Sat", date: "", snoreCount: 0 },
    { day: "Sun", date: "", snoreCount: 0 },
  ]);

  useEffect(() => {
    if (records && records.length > 0) {
      const filteredRecords = records.filter(
        (record) => record.week === `Week ${selectedWeek + 1}`
      );

      const updatedSleepData = [...sleepData].map((dayData) => ({
        ...dayData,
        snoreCount: 0,
      }));

      filteredRecords.forEach((record) => {
        const createdAtDate = new Date(record.createdAt);
        const dayIndex = createdAtDate.getDay();
        const totalSnore = parseInt(record.snoreCount);

        updatedSleepData[dayIndex - 1] = {
          ...updatedSleepData[dayIndex - 1],
          date: createdAtDate.toLocaleDateString(),
          snoreCount: updatedSleepData[dayIndex - 1].snoreCount + totalSnore,
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
    <div className="col-12 col-lg-6 mb-5 mb-lg-0 ">
      <div className="shadow-sm p-3 rounded-3 bg-white ">
        <div className="d-flex align-items-center justify-content-between border-0 mb-3">
          <h6>Snore Count Summary</h6>
          {records.length > 0 && (
            <select
              name="filterWeek"
              className="py-1 px-3 border-dark-subtle "
              onChange={handleWeekChange}
              value={selectedWeek}
            >
              {weekOptions}
            </select>
          )}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart width={600} height={300} data={sleepData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => [
                `Snore Count: ${value}`,
                `Date: ${props.payload.date}`,
              ]}
            />
            <Area
              type="monotone"
              dataKey="snoreCount"
              fill="#ff7300"
              stroke="#ff7300"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SnoreChart;
