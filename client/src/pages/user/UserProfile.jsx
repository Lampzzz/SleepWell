import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchUserDetail } from "../../services/api/fetchUserDetail";
import PageTitle from "../../components/dashboard/PageTitle";
import ProfileBtn from "../../components/dashboard/ProfileBtn";
import UserNavbar from "./UserNavbar";
import Input from "../../components/form/Input";
import ButtonAction from "../../components/button/ButtonAction";
import Avatar from "../../components/form/Avatar";
import { useUpdateProfleMutation } from "../../services/redux/api/userApiSlice";
import { setCredentials } from "../../services/redux/slice/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, setUser } = fetchUserDetail();
  const [updateUser, { isLoading }] = useUpdateProfleMutation();
  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (fieldName, value) => {
    let errors = { ...validationErrors };
    const nameRegex = /^[a-zA-Z0-9 ]*$/;

    switch (fieldName) {
      case "firstName":
        errors.firstName = !nameRegex.test(value)
          ? "First Name cannot contain special characters"
          : "";
        break;
      case "lastName":
        errors.lastName = !nameRegex.test(value)
          ? "Last Name cannot contain special characters"
          : "";
        break;
      case "middleName":
        errors.middleName = !nameRegex.test(value)
          ? "Middle Name cannot contain special characters"
          : "";
        break;

      default:
        break;
    }

    setValidationErrors(errors);
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUser({ ...user, image: e.target.files[0] });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }

    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("middleName", user.middleName);
      formData.append("email", user.email);
      formData.append("avatar", user.image);

      const response = await updateUser(formData).unwrap();
      dispatch(setCredentials(response));
      toast.success("User Updated Successfully.");
    } catch (err) {
      toast.error(err.data.errorMessage);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      dispatch(logout());
      toast.success("Account Deleted Successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.errorMessage || err.message);
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="container">
        <PageTitle
          title={"User Profile"}
          subtitle={"Set your account settings down below"}
        />
        <div className="text-center mb-5 d-flex justify-content-center">
          <ProfileBtn to="/user/profile" label="Profile" />
          <ProfileBtn to="/user/password" label="Password" />
        </div>
        <div className="mb-3 row">
          <div className="col-12 col-md-8 col-lg-6 mx-auto">
            <form onSubmit={handleSubmit}>
              <Avatar
                src={
                  user.image
                    ? URL.createObjectURL(user.image)
                    : `http://localhost:3000/images/${user.avatar}`
                }
                handleChange={handleChange}
              />
              <div className="row mb-2">
                <div className="col-12 col-md-6 mb-2 mb-md-0">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <Input
                    type={"text"}
                    name={"firstName"}
                    style={validationErrors.firstName ? "error" : ""}
                    value={user.firstName}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  {validationErrors.firstName && (
                    <small className="text-danger">
                      {validationErrors.firstName}
                    </small>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <Input
                    type={"text"}
                    name={"lastName"}
                    style={validationErrors.lastName ? "error" : ""}
                    value={user.lastName}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  {validationErrors.lastName && (
                    <small className="text-danger">
                      {validationErrors.lastName}
                    </small>
                  )}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-12 col-md-6 mb-2 mb-md-0">
                  <label htmlFor="middleName mb-2" className="form-label">
                    Middle Name
                  </label>
                  <Input
                    type={"text"}
                    name={"middleName"}
                    style={validationErrors.middleName ? "error" : ""}
                    value={user.middleName}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  {validationErrors.middleName && (
                    <small className="text-danger">
                      {validationErrors.middleName}
                    </small>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    disabled
                    value={user.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
              <div className="d-flex flex-column align-items-center mt-3 mb-5">
                <ButtonAction
                  style={"btn btn-primary mb-5 w-50"}
                  type={"submit"}
                  label={"Save changes"}
                  isLoading={isLoading}
                />
                <button
                  type="button"
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-outline-danger w-50"
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
