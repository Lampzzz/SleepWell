import AdminNavbar from "./AdminNavbar";
import Analysis from "../../components/dashboard/Analysis";
import HighestData from "../../components/dashboard/HighestData";
import BedtimeChart from "./graph/BedtimeChart";
import { formatDuration, formatDate } from "../../utils/formatTime";
import { fetchUserDetail } from "../../services/api/fetchUserDetail";
import {
  fetchAllUser,
  fetchAllAdmin,
  fetchAllRecord,
} from "../../services/api/fetchAllData";
import totalSleepIcon from "../../assets/image/total-sleep.png";
import adminIcon from "../../assets/image/admin.png";
import userIcon from "../../assets/image/user.png";

const AdminDashboard = () => {
  const { user } = fetchUserDetail();
  const { users } = fetchAllUser();
  const { admins } = fetchAllAdmin();
  const { records } = fetchAllRecord();

  const sortRecords = (key) => {
    if (!records || records.length === 0) return null;

    return [...records].sort((a, b) => parseInt(b[key]) - parseInt(a[key]));
  };

  const renderRecords = (sortedRecords, key) => {
    if (!sortedRecords || sortedRecords.length === 0 || records.length === 0)
      return null;
    const topThreeRecords = sortedRecords.slice(0, 3);

    return topThreeRecords.map((record, index) => (
      <tr key={record._id}>
        <td>{index + 1}</td>
        <td>
          {record.user.firstName}
          {record.user.middleName}
          {record.user.lastName}
        </td>
        <td>
          {key === "sleepDuration" ? formatDuration(record[key]) : record[key]}
        </td>
        <td>{formatDate(record.createdAt)}</td>
      </tr>
    ));
  };

  const calculateAverageBedtime = () => {
    if (!records || records.length === 0) return "0";

    let totalBedtimeMinutes = 0;
    let totalUsers = 0;

    records.forEach((record) => {
      if (record.bedtime) {
        const timeComponents = record.bedtime.split(" ");
        const hourMinute = timeComponents[0].split(":");
        const hour = parseInt(hourMinute[0]);
        const minute = parseInt(hourMinute[1]);
        const meridiem = timeComponents[1];

        let bedtimeHour = hour;

        if (meridiem === "pm" && hour < 12) {
          bedtimeHour += 12;
        }

        totalBedtimeMinutes += bedtimeHour * 60 + minute;
        totalUsers++;
      }
    });

    const averageMinutes = totalBedtimeMinutes / totalUsers;
    let averageHour = Math.floor(averageMinutes / 60);
    const averageMinute = Math.floor(averageMinutes % 60);
    let meridiem = "am";

    // Convert to 12-hour format
    if (averageHour >= 12) {
      meridiem = "pm";
      if (averageHour > 12) {
        averageHour -= 12;
      }
    }

    return `${averageHour}:${averageMinute.toString().padStart(2, "0")} ${
      averageHour >= 12 ? "pm" : "am"
    }`;
  };

  return (
    <>
      <AdminNavbar />;
      <div className="container">
        <div className="mt-4 mb-5">
          <h2>Dashboard</h2>
          <p className="mb-0">
            Hi, <span className="fw-bold">{user.firstName}</span>. Nice to meet
            you again
          </p>
        </div>
        <div className="row mb-5">
          <Analysis
            bgColor={"#007bff"}
            label={"Avg. Bedtime"}
            analysis={records ? calculateAverageBedtime() : 0}
            icon={totalSleepIcon}
          />
          <Analysis
            bgColor={"#58B05C"}
            label={"Total User"}
            analysis={users ? users.length : 0}
            icon={userIcon}
          />
          <Analysis
            bgColor={"#DC3545"}
            label={"Total Admin"}
            analysis={admins ? admins.length : 0}
            icon={adminIcon}
          />
        </div>
        <div className="row mb-5">
          <HighestData
            label={"Users with Highest Sleep Duration"}
            columnName={"Sleep Duration"}
            displayData={
              records &&
              renderRecords(sortRecords("sleepDuration"), "sleepDuration")
            }
          />
          <HighestData
            label={"Users with Highest Snore Count"}
            columnName={"Snore Count"}
            displayData={
              records && renderRecords(sortRecords("snoreCount"), "snoreCount")
            }
          />
        </div>
        <div className="row mb-5">
          <BedtimeChart />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
