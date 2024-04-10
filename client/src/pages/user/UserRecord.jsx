import { useState } from "react";
import { PulseLoader } from "react-spinners";
import UserNavbar from "./UserNavbar";
import { fetchUserRecord } from "../../services/api/fetchUserRecord";
import { formatDate, formatDuration } from "../../utils/formatTime";
import { paginationData } from "../../utils/paginationData";
import PaginationButton from "../../components/button/PaginationButton";
import UserVideoModal from "./UserVideoModal";

const UserRecord = () => {
  const { records, isLoading } = fetchUserRecord();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { startIndex, endIndex, totalPages, itemsPerPage } = paginationData(
    currentPage,
    records.length
  );

  const displayedRecords = records.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenVideo = (video) => {
    setSelectedVideo(video);
  };

  return (
    <>
      <UserNavbar />
      <div className="container">
        <div className="mt-4 mb-5">
          <h2>Sleep Record</h2>
          <p className="mb-0">Efficiently access and oversee sleep records</p>
        </div>
        {isLoading ? (
          <div className="text-center pt-5">
            <PulseLoader color={"#ececec"} loading={isLoading} size={15} />
          </div>
        ) : displayedRecords && displayedRecords.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover table--custom">
              <thead>
                <tr>
                  <td>No.</td>
                  <td>Date</td>
                  <td>Bedtime</td>
                  <td>Wake-up</td>
                  <td>Sleep Duration</td>
                  <td>Snore Count</td>
                  <td>Video</td>
                </tr>
              </thead>
              <tbody>
                {displayedRecords.map((record, index) => (
                  <tr key={record._id} className="py-4">
                    <td>{startIndex + index + 1}</td>
                    <td>{formatDate(record.createdAt)}</td>
                    <td>{record.bedtime}</td>
                    <td>{record.wakeUp}</td>
                    <td>{formatDuration(record.sleepDuration)}</td>
                    <td>{record.snoreCount}</td>
                    <td>
                      <button
                        onClick={() => handleOpenVideo(record.video)}
                        className="btn text-black-50 text-decoration-underline border-0"
                      >
                        Watch Record
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">
            <p>No records found</p>
          </div>
        )}
        {records.length > itemsPerPage && (
          <PaginationButton
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <UserVideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
};

export default UserRecord;
