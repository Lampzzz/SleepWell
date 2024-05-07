import { formatSecond } from "../../utils/formatTime";
import { fetchUserDetail } from "../../services/api/fetchUserDetail";
import { fetchUserRecord } from "../../services/api/fetchUserRecord";
import UserNavbar from "./UserNavbar";
import DurationChart from "./graph/DurationChart";
import SnoreChart from "./graph/SnoreChart";
import avgSleepIcon from "../../assets/image/avg-sleep.png";
import avgSnoreIcon from "../../assets/image/avg-snore.png";
import totalSleepIcon from "../../assets/image/total-sleep.png";
import totalSnoreIcon from "../../assets/image/total-snore.png";
import Analysis from "../../components/dashboard/Analysis";

const UserDashboard = () => {
  const { user } = fetchUserDetail();
  const { records } = fetchUserRecord();

  const totalDuration = records.reduce(
    (totalSeconds, record) => totalSeconds + parseInt(record.sleepDuration),
    0
  );

  const totalCount = records.reduce(
    (totalSnore, record) => totalSnore + parseInt(record.snoreCount),
    0
  );

  const avgDuration = Math.floor(totalDuration / records.length);
  const avgSnore = Math.floor(totalCount / records.length);

  return (
    <>
      <UserNavbar />
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
            label={"Avg. Sleep Duration"}
            analysis={avgDuration ? formatSecond(avgDuration) : 0}
            icon={avgSleepIcon}
          />
          <Analysis
            bgColor={"#58B05C"}
            label={"Avg. Snore Count"}
            analysis={avgSnore ? avgSnore : 0}
            icon={avgSnoreIcon}
          />
          <Analysis
            bgColor={"#DC3545"}
            label={"Total Sleep Duration"}
            analysis={totalDuration ? formatSecond(totalDuration) : 0}
            icon={totalSleepIcon}
          />
          <Analysis
            bgColor={"#FFC107"}
            label={"Total Snore Count"}
            analysis={totalCount ? totalCount : 0}
            icon={totalSnoreIcon}
          />
        </div>
        <div className="row mb-5">
          <DurationChart />
          <SnoreChart />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
