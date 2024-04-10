import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import SuperNavbar from "./SuperNavbar";
import TableLoading from "../../components/loading/TableLoading";
import PaginationButton from "../../components/button/PaginationButton";
import { fetchAllAdmin } from "../../services/api/fetchAllAdmin";
import { paginationData } from "../../utils/paginationData";
import { useDeleteAdminsAccountMutation } from "../../services/redux/api/superAdminApiSlice";
import { formatDate } from "../../utils/formatTime";

const AdminAccount = () => {
  const navigate = useNavigate();
  const { admins, isLoading, refetch } = fetchAllAdmin();
  const [deleteAdminsAccount] = useDeleteAdminsAccountMutation();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { startIndex, endIndex, totalPages, itemsPerPage } = paginationData(
    currentPage,
    admins.length
  );

  const displayedAdmins = searchResult.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (admins) {
      const filterResult = admins.filter((admin) => {
        const fullName = `${admin.firstName} ${admin.middleName} ${admin.lastName}`;
        return fullName.toLowerCase().includes(search.toLowerCase());
      });
      setSearchResult(filterResult);
    }
  }, [admins, search]);

  const handleDelete = async (id) => {
    try {
      await deleteAdminsAccount(id);
      toast.success("User Remove Successfully");
      refetch();
    } catch (err) {
      console.error(err.data.message);
      toast.error(err.data.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      navigate(`/super/edit-admin/${id}`);
    } catch (err) {
      console.log(err);
      toast.error(err.data.message);
    }
  };

  return (
    <>
      <SuperNavbar />
      <div className="container">
        <div className="mt-4 mb-5">
          <div className="mb-3 mb-lg-0">
            <h2>Admin Account</h2>
            <p className="mb-0">Streamline user access and account control</p>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <div className="position-relative">
            <input
              type="text"
              className="form-control bg-transparent border-2"
              placeholder="Search name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="bg-transparent bg-white search__icon">
              <CiSearch className="text-black-50" size={25} />
            </div>
          </div>
          <Link to="/super/create">
            <button className="btn btn-outline-primary">Add Admin</button>
          </Link>
        </div>
        {isLoading ? (
          <TableLoading isLoading={isLoading} />
        ) : displayedAdmins.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover table--custom">
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
                {displayedAdmins.map((admin, index) => (
                  <tr key={admin._id}>
                    <td>{startIndex + index + 1}</td>
                    <td>
                      <img
                        src={`http://localhost:3000/images/${admin.avatar}`}
                        style={{ width: "40px", height: "40px" }}
                        className="rounded-circle me-2"
                        alt={`Avatar of ${admin.firstName} ${admin.lastName}`}
                      />
                    </td>
                    <td>
                      {admin.firstName} {admin.middleName} {admin.lastName}
                    </td>
                    <td>{admin.email}</td>
                    <td>{formatDate(admin.registered)}</td>
                    <td>
                      <div className="d-flex">
                        <button
                          className="btn text-black-50 border-0"
                          onClick={() => handleUpdate(admin._id)}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="btn text-black-50 border-0 "
                          onClick={() => handleDelete(admin._id)}
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
          <div className="text-center mt-5">
            {admins && admins.length > 0 ? (
              <p>No matching results found</p>
            ) : (
              <p>No admin found</p>
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

export default AdminAccount;
