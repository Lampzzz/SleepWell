import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Component
import BackButton from "../../components/button/BackButton";
import AdminNavbar from "./AdminNavbar";
import Input from "../../components/form/Input";
import TogglePassword from "../../components/form/TogglePassword";
import Avatar from "../../components/form/Avatar";
import ButtonAction from "../../components/button/ButtonAction";

// Redux
import {
  useGetUserDetailsQuery,
  useUpdateUsersAccountMutation,
} from "../../services/redux/api/adminApiSlice";

const EditUserAccount = () => {
  const initialize = {
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    password: "",
    image: null,
    email: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, refetch } = useGetUserDetailsQuery(id);
  const [updateUsersAccount, { isLoading }] = useUpdateUsersAccountMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [user, setUser] = useState(initialize);

  useEffect(() => {
    if (data) {
      const { _id, firstName, middleName, lastName, avatar, email } = data;
      setUser({
        id: _id,
        firstName: firstName || "",
        middleName: middleName || "",
        lastName: lastName || "",
        password: "",
        avatar: avatar || null,
        email: email || "",
      });
    }
  }, [data, refetch]);

  const validateField = (fieldName, value) => {
    let errors = { ...validationErrors };
    const nameRegex = /^[a-zA-Z0-9 ]*$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

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

      case "password":
        errors.password = !passwordRegex.test(value)
          ? "Invalid password format"
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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("firstName", user.firstName);
      formData.append("lastName", user.lastName);
      formData.append("middleName", user.middleName);
      formData.append("email", user.email);
      formData.append("avatar", user.image);
      formData.append("password", user.password);

      await updateUsersAccount(formData).unwrap();
      toast.success("User Update Successfully");
      refetch();
      navigate("/admin/user-account");
    } catch (err) {
      const responseError = err.data;
      if (responseError && responseError.errors) {
        const serverErrors = responseError.errors.reduce((acc, curr) => {
          acc[curr.field] = curr.message;
          return acc;
        }, {});
        setValidationErrors(serverErrors);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <BackButton to={"/admin/user-account"} />
        <div className="mb-3 row">
          <div className="col-12 col-md-8 col-lg-6 mx-auto">
            <form onSubmit={handleSubmit}>
              <Avatar
                src={user.image ? URL.createObjectURL(user.image) : user.avatar}
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
                <div className="mb-2">
                  <label htmlFor="password">Password</label>
                  <div className="position-relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name={"password"}
                      style={validationErrors.password ? "error" : ""}
                      value={user.password}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    <TogglePassword
                      showPassword={showPassword}
                      handleTogglePassword={handleTogglePassword}
                    />
                  </div>
                  {validationErrors.password && (
                    <small className="text-danger">
                      {validationErrors.password}
                    </small>
                  )}
                  <div id="password" className="form-text">
                    Your password must be 8-20 characters long, contain atleast
                    one capital letters, numbers, and special characters
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center my-3">
                <ButtonAction
                  style={"btn btn-primary w-50"}
                  type={"submit"}
                  label={"Save changes"}
                  isLoading={isLoading}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserAccount;
