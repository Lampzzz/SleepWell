import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SuperNavbar from "./SuperNavbar";
import BackButton from "../../components/button/BackButton";
import Input from "../../components/form/Input";
import TogglePassword from "../../components/form/TogglePassword";
import ButtonAction from "../../components/button/ButtonAction";
import Avatar from "../../components/form/Avatar";
import { useCreateAdminMutation } from "../../services/redux/api/superAdminApiSlice";

const CreateAdmin = () => {
  const initialize = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    avatar: null,
  };

  const navigate = useNavigate();
  const [createAdmin, { isLoading }] = useCreateAdminMutation();
  const [admin, setAdmin] = useState(initialize);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (fieldName, value) => {
    let errors = { ...validationErrors };

    switch (fieldName) {
      case "firstName":
        const fisrtNameRegex = /^[a-zA-Z0-9 ]+$/;
        errors.firstName =
          value.trim() === ""
            ? "First Name is required"
            : !fisrtNameRegex.test(value)
            ? "First Name cannot contain special characters"
            : "";
        break;

      case "lastName":
        const lastNameRegex = /^[a-zA-Z0-9 ]+$/;
        errors.lastName =
          value.trim() === ""
            ? "Last Name is required"
            : !lastNameRegex.test(value)
            ? "Last Name cannot contain special characters"
            : "";
        break;

      case "middleName":
        const middleNameRegex = /^[a-zA-Z0-9 ]*$/;
        errors.middleName = !middleNameRegex.test(value)
          ? "Middle Name cannot contain special characters"
          : "";
        break;

      case "email":
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
        errors.email =
          value.trim() === ""
            ? "Email is required"
            : !emailRegex.test(value)
            ? "Invalid email address"
            : "";
        break;

      case "password":
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
        errors.password =
          value.trim() === ""
            ? "Password is required"
            : !passwordRegex.test(value)
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
    if (e.target.name === "avatar") {
      setAdmin({ ...admin, avatar: e.target.files[0] });
    } else {
      setAdmin({ ...admin, [e.target.name]: e.target.value });
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
      formData.append("firstName", admin.firstName);
      formData.append("lastName", admin.lastName);
      formData.append("middleName", admin.middleName);
      formData.append("email", admin.email);
      formData.append("password", admin.password);
      formData.append("avatar", admin.avatar);

      await createAdmin(formData).unwrap();
      toast.success("Admin Created Successfully");
      navigate("/super/admin-account");
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
      <SuperNavbar />
      <div className="container">
        <BackButton to={"/super/admin-account"} />
        <div className="mb-3 row">
          <div className="col-12 col-md-8 col-lg-6 mx-auto">
            <form onSubmit={handleSubmit}>
              <Avatar
                src={
                  admin.image
                    ? URL.createObjectURL(admin.image)
                    : `../../src/assets/image/default.jpg`
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
                    value={admin.firstName}
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
                    value={admin.lastName}
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
                    value={admin.middleName}
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
                  <Input
                    type={"text"}
                    name={"email"}
                    style={validationErrors.email ? "error" : ""}
                    value={admin.email}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  {validationErrors.email && (
                    <small className="text-danger">
                      {validationErrors.email}
                    </small>
                  )}
                </div>
                <div className="mb-2">
                  <label htmlFor="password">Password</label>
                  <div className="position-relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name={"password"}
                      style={validationErrors.password ? "error" : ""}
                      value={admin.password}
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
                  label={"Create"}
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

export default CreateAdmin;
