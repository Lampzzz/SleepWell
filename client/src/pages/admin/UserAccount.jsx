import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import TableLoading from "../../components/loading/TableLoading";
import PaginationButton from "../../components/button/PaginationButton";
import { fetchAllUser } from "../../services/api/fetchAllData";
import { paginationData } from "../../utils/paginationData";
import { useDeleteUsersAccountMutation } from "../../services/redux/api/adminApiSlice";
import { formatDate } from "../../utils/formatTime";

const UserAccount = () => {
  const navigate = useNavigate();
  const { users, refetch, isLoading } = fetchAllUser();
  const [deleteUsersAccount] = useDeleteUsersAccountMutation();
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { startIndex, endIndex, totalPages, itemsPerPage } = paginationData(
    currentPage,
    users.length
  );

  const displayedUsers = searchResult.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (users) {
      const filterResult = users.filter((user) => {
        const fullName = `${user.firstName} ${user.middleName} ${user.lastName}`;
        return fullName.toLowerCase().includes(search.toLowerCase());
      });
      setSearchResult(filterResult);
    }
  }, [users, search]);

  const handleDelete = async (id) => {
    try {
      await deleteUsersAccount(id);
      toast.success("User Remove Successfully");
      refetch();
    } catch (err) {
      console.error(err.data.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      navigate(`/admin/edit-user/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <div className="d-flex flex-column flex-lg-row justify-content-lg-between align-items-start align-items-lg-end mt-4 mb-5">
          <div className="mb-3 mb-lg-0">
            <h2>User Account</h2>
            <p className="mb-0">Streamline user access and account control</p>
          </div>
          {users.length > 0 ? (
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
          ) : null}
        </div>
        {isLoading ? (
          <TableLoading isLoading={isLoading} />
        ) : displayedUsers.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover table--custom mb-4">
              <thead>
                <tr>
                  <td>No.</td>
                  <td>Avatar</td>
                  <td>Full Name</td>
                  <td>Email</td>
                  <td>Registered</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{startIndex + index + 1}</td>
                    <td>
                      <img
                        src={`http://localhost:3000/images/${user.avatar}`}
                        style={{ width: "40px", height: "40px" }}
                        className="rounded-circle me-2"
                        alt={`Avatar of ${user.firstName} ${user.lastName}`}
                      />
                    </td>
                    <td>
                      {user.firstName} {user.middleName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{formatDate(user.registered)}</td>
                    <td>
                      <div className="d-flex">
                        <button
                          className="btn text-black-50 border-0"
                          onClick={() => handleUpdate(user._id)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="btn text-black-50 border-0 "
                          onClick={() => handleDelete(user._id)}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">
            {users && users.length > 0 ? (
              <p>No matching results found</p>
            ) : (
              <p>No users found</p>
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

export default UserAccount;
