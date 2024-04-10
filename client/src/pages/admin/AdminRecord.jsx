import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import AdminNavbar from "./AdminNavbar";
import TableLoading from "../../components/loading/TableLoading";
import { formatDate, formatDuration } from "../../utils/formatTime";
import { useDeleteUsersRecordMutation } from "../../services/redux/api/adminApiSlice";
import { fetchAllRecord } from "../../services/api/fetchAllData";
import { paginationData } from "../../utils/paginationData";
import PaginationButton from "../../components/button/PaginationButton";

const AdminRecord = () => {
  const { records, refetch, isLoading } = fetchAllRecord();
  const [deleteUsersRecord] = useDeleteUsersRecordMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { startIndex, endIndex, totalPages, itemsPerPage } = paginationData(
    currentPage,
    records.length
  );

  const displayedRecords = searchResult.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log(records);

  useEffect(() => {
    if (records) {
      const filterResult = records.filter((record) => {
        const fullName = `${record.user.firstName} ${record.user.middleName}${record.user.lastName}`;
        return fullName.toLowerCase().includes(search.toLowerCase());
      });
      setSearchResult(filterResult);
    }
  }, [records, search]);

  const handleDelete = async (id) => {
    try {
      await deleteUsersRecord(id);
      toast.success("User Remove Successfully");
      refetch();
    } catch (err) {
      console.error(err.data.errorMessage);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <div className="d-flex justify-content-between my-5 align-items-end">
          <div>
            <h2>Sleep Record</h2>
            <p className="mb-0">Efficiently access and oversee sleep records</p>
          </div>
          {records.length > 0 && (
            <div className="position-relative">
              <input
                type="text"
                className="form-control py-2 bg-transparent border-2"
                placeholder="Search name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="bg-transparent bg-white search__icon">
                <CiSearch className="text-black-50" size={25} />
              </div>
            </div>
          )}
        </div>
        {isLoading ? (
          <TableLoading isLoading={isLoading} />
        ) : displayedRecords.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover table--custom">
              <thead>
                <tr>
                  <td>No.</td>
                  <td>Full Name</td>
                  <td>Bedtime</td>
                  <td>Wake-up</td>
                  <td>Sleep Duration</td>
                  <td>Snore Count</td>
                  <td>Date</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {displayedRecords &&
                  displayedRecords.map((record, index) => (
                    <tr key={record._id}>
                      <td>{startIndex + index + 1}</td>
                      {record.user ? (
                        <td>
                          {record.user.firstName} {record.user.middleName}
                          {record.user.lastName}
                        </td>
                      ) : (
                        <td></td>
                      )}
                      <td>{record.bedtime}</td>
                      <td>{record.wakeUp}</td>
                      <td>{formatDuration(record.sleepDuration)}</td>
                      <td>{record.snoreCount}</td>
                      <td>{formatDate(record.createdAt)}</td>
                      <td>
                        <button
                          className="btn text-black-50 border-0 "
                          onClick={() => handleDelete(record._id)}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">
            {records.length > 0 ? (
              <p>No matching results found</p>
            ) : (
              <p>No records found</p>
            )}
          </div>
        )}
        {searchResult.length > itemsPerPage && (
          <PaginationButton
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default AdminRecord;
