import { useState } from "react";
import { toast } from "react-toastify";
import ProfileBtn from "../../components/dashboard/ProfileBtn";
import SuperNavbar from "./SuperNavbar";
import Input from "../../components/form/Input";
import ButtonAction from "../../components/button/ButtonAction";
import TogglePassword from "../../components/form/TogglePassword";
import { useUpdatePasswordMutation } from "../../services/redux/api/userApiSlice";

const SuperPassword = () => {
  const initialize = {
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  };

  const [updateUser, { isLoading }] = useUpdatePasswordMutation();
  const [password, setPassword] = useState(initialize);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (fieldName, value) => {
    let errors = { ...validationErrors };
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

    switch (fieldName) {
      case "currentPassword":
        errors.currentPassword =
          value.trim() === "" ? "Current Password is required" : "";
        break;

      case "newPassword":
        errors.newPassword =
          value.trim() === ""
            ? "New Password is required"
            : !passwordRegex.test(value)
            ? "Invalid password format"
            : "";

        if (password.repeatPassword && password.repeatPassword !== value) {
          errors.repeatPassword = "Password does not match";
        }

        if (password.repeatPassword && password.repeatPassword == value) {
          errors.repeatPassword = "";
        }
        break;

      case "repeatPassword":
        errors.repeatPassword =
          value.trim() === ""
            ? "Repeat Password is required"
            : value !== password.newPassword
            ? "Password does not match"
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
    setPassword({ ...password, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const handleToggleCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(password).unwrap();
      setPassword(initialize);
      toast.success("User Updated Successfully.");
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
        <div className="mt-4 mb-5">
          <h2>Admin Profile</h2>
          <p className="mb-0">Set your account settings down below</p>
        </div>
        <div className="text-center mb-5 d-flex justify-content-center">
          <ProfileBtn to="/super/profile" label="Profile" />
          <ProfileBtn to="/super/password" label="Password" />
        </div>
        <div className="mb-3 row">
          <div className="col-12 col-md-8 col-lg-6 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label">Current Password</label>
                <div className="position-relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    name={"currentPassword"}
                    style={validationErrors.currentPassword ? "error" : ""}
                    value={password.currentPassword}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <TogglePassword
                    showPassword={showCurrentPassword}
                    handleTogglePassword={handleToggleCurrentPassword}
                  />
                </div>
                {validationErrors.currentPassword && (
                  <small className="text-danger">
                    {validationErrors.currentPassword}
                  </small>
                )}
              </div>
              <div className="mb-2">
                <label className="form-label">New Password</label>
                <div className="position-relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    name={"newPassword"}
                    style={validationErrors.newPassword ? "error" : ""}
                    value={password.newPassword}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <TogglePassword
                    showPassword={showNewPassword}
                    handleTogglePassword={handleToggleNewPassword}
                  />
                </div>
                {validationErrors.newPassword && (
                  <small className="text-danger">
                    {validationErrors.newPassword}
                  </small>
                )}
                <div className="form-text">
                  Your password must be 8-20 characters long, contain atleast
                  one capital letters, numbers, and special characters
                </div>
              </div>
              <div className="mb-2">
                <label className="form-label">Repeat New Password</label>
                <div className="position-relative">
                  <Input
                    type={showRepeatPassword ? "text" : "password"}
                    name={"repeatPassword"}
                    style={validationErrors.repeatPassword ? "error" : ""}
                    value={password.repeatPassword}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <TogglePassword
                    showPassword={showRepeatPassword}
                    handleTogglePassword={handleToggleRepeatPassword}
                  />
                </div>
                {validationErrors.repeatPassword && (
                  <small className="text-danger">
                    {validationErrors.repeatPassword}
                  </small>
                )}
              </div>
              <div className="text-center mt-4">
                <ButtonAction
                  style={"btn btn-primary mb-5 w-50"}
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

export default SuperPassword;
