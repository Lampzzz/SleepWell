import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

// Component
import Input from "../../components/form/Input";
import ButtonAction from "../../components/button/ButtonAction";
import TogglePassword from "../../components/form/TogglePassword";
import Logo from "../../components/form/Logo";
import Title from "../../components/form/Title";

// Redux
import { useResetPasswordMutation } from "../../services/redux/api/authApiSlice";

const ResetPass = () => {
  const initialize = {
    password: "",
    resetPassword: "",
  };

  const navigate = useNavigate();
  const [auth, setAuth] = useState(initialize);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (fieldName, value) => {
    let errors = { ...validationErrors };

    switch (fieldName) {
      case "password":
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;
        errors.password =
          value.trim() === ""
            ? "New Password is required"
            : !passwordRegex.test(value)
            ? "Invalid password format"
            : "";

        if (auth.resetPassword && auth.resetPassword !== value) {
          errors.resetPassword = "Password does not match";
        } else if (auth.resetPassword && auth.resetPassword == value) {
          errors.resetPassword = "";
        }
        break;

      case "resetPassword":
        errors.resetPassword =
          value.trim() === ""
            ? "Repeat Password is required"
            : value !== auth.password
            ? "Password does not match"
            : "";
        break;
    }

    setValidationErrors(errors);
  };

  // Error when leave input
  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  // Change data and Error when change
  const handleChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  // Show / Hide password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Show / Hide Confirm password
  const handleToggleResetPassword = () => {
    setShowResetPassword(!showResetPassword);
  };

  // Submit to server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await resetPassword(auth).unwrap();

      if (response.isSuccess) {
        toast.success("User Updated Successfully");
        navigate("/login");
      }

      setAuth(initialize);
    } catch (err) {
      const responseError = err.data;
      if (responseError && responseError.errors) {
        const serverErrors = responseError.errors.reduce((acc, curr) => {
          acc[curr.field] = curr.message;
          return acc;
        }, {});

        setValidationErrors(serverErrors);
      } else {
        if (err.data?.isExpired) {
          toast.error(
            "Token expired. Please request a new password reset link."
          );
          navigate("/forgot-password");
        }
      }
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="row my-5">
          <div className="col-12 col-md-7 col-lg-5 p-4 rounded-3 mx-auto bg-white wrapper">
            <Logo />
            <Title
              title={"Reset Password"}
              subtitle={`Secure your account by setting up a new password`}
            />
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label>New Password</label>
                <div className="position-relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name={"password"}
                    style={validationErrors.password ? "error" : ""}
                    value={auth.password}
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
                <div className="mb-2">
                  <label>Repeat New Password</label>
                  <div className="position-relative">
                    <Input
                      type={showResetPassword ? "text" : "password"}
                      name={"resetPassword"}
                      style={validationErrors.resetPassword ? "error" : ""}
                      value={auth.resetPassword}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    <TogglePassword
                      showPassword={showResetPassword}
                      handleTogglePassword={handleToggleResetPassword}
                    />
                  </div>
                  {validationErrors.resetPassword && (
                    <small className="text-danger">
                      {validationErrors.resetPassword}
                    </small>
                  )}
                </div>
              </div>
              <ButtonAction
                style={"btn btn-primary mt-4 mb-3 w-100"}
                type={"submit"}
                label={"Update"}
                isLoading={isLoading}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
