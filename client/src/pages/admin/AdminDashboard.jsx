import AdminNavbar from "./AdminNavbar";
import Analysis from "../../components/dashboard/Analysis";
import HighestData from "../../components/dashboard/HighestData";
import BedtimeChart from "./graph/BedtimeChart";
import { formatDuration } from "../../utils/formatTime";
import { fetchUserDetail } from "../../services/api/fetchUserDetail";
import {
  fetchAllUser,
  fetchAllAdmin,
  fetchAllRecord,
} from "../../services/api/fetchAllData";

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
    if (!sortedRecords || sortedRecords.length === 0) return null;
    const topThreeRecords = sortedRecords.slice(0, 3);

    return topThreeRecords.map((record, index) => (
      <tr key={record._id}>
        <td>{index + 1}</td>
        <td>
          {record.user.firstName} {record.user.middleName}
          {record.user.lastName}
        </td>
        <td>
          {key === "sleepDuration" ? formatDuration(record[key]) : record[key]}
        </td>
        <td>{record.createdAt}</td>
      </tr>
    ));
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
            analysis={"0"}
            icon={"src/assets/image/total-sleep.png"}
          />
          <Analysis
            bgColor={"#58B05C"}
            label={"Total User"}
            analysis={users ? users.length : 0}
            icon={"src/assets/image/user.png"}
          />
          <Analysis
            bgColor={"#DC3545"}
            label={"Total Admin"}
            analysis={admins ? admins.length : 0}
            icon={"src/assets/image/admin.png"}
          />
        </div>
        <div className="row mb-5">
          <HighestData
            label={"Users with Highest Sleep Duration"}
            columnName={"Sleep Duration"}
            displayData={renderRecords(
              sortRecords("sleepDuration"),
              "sleepDuration"
            )}
          />
          <HighestData
            label={"Users with Highest Snore Count"}
            columnName={"Snore Count"}
            displayData={renderRecords(sortRecords("snoreCount"), "snoreCount")}
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
