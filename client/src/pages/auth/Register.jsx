import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Component
import Input from "../../components/form/Input";
import ButtonAction from "../../components/button/ButtonAction";
import TogglePassword from "../../components/form/TogglePassword";
import Logo from "../../components/form/Logo";
import Title from "../../components/form/Title";

// Redux
import { useRegisterMutation } from "../../services/redux/api/authApiSlice";
import { setCredentials } from "../../services/redux/slice/authSlice";

const Register = () => {
  const initialize = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [auth, setAuth] = useState(initialize);
  const [validationErrors, setValidationErrors] = useState({});

  // Validation Errors
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

        if (auth.confirmPassword && auth.confirmPassword !== value) {
          errors.confirmPassword = "Password does not match";
        } else if (auth.confirmPassword && auth.confirmPassword == value) {
          errors.confirmPassword = "";
        }
        break;

      case "confirmPassword":
        errors.confirmPassword =
          value.trim() === ""
            ? "Confirm Password is required"
            : value !== auth.password
            ? "Password does not match"
            : "";
        break;
      default:
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
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Submit to server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await register(auth).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/verify-otp");
      setAuth(initialize);
    } catch (error) {
      const responseError = error.data;
      if (responseError && responseError.errors) {
        const serverErrors = responseError.errors.reduce((acc, curr) => {
          acc[curr.field] = curr.message;
          return acc;
        }, {});
        setValidationErrors(serverErrors);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="row my-5">
          <div className="col-12 col-md-7 col-lg-6 p-4 rounded-3 mx-auto bg-white wrapper">
            <Logo />
            <Title
              title={"Register"}
              subtitle={`We're happy you're here. Let's get your account set up`}
            />
            <form onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col-12 col-md-6 mb-2 mb-lg-0">
                  <label>First Name</label>
                  <Input
                    type={"text"}
                    name={"firstName"}
                    style={validationErrors.firstName ? "error" : ""}
                    value={auth.firstName}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  {validationErrors.firstName && (
                    <small className="text-danger">
                      {validationErrors.firstName}
                    </small>
                  )}
                </div>
                <div className="col-12 col-md-6 mb-2 mb-lg-0">
                  <label>Last Name</label>
                  <Input
                    type={"text"}
                    name={"lastName"}
                    style={validationErrors.lastName ? "error" : ""}
                    value={auth.lastName}
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
                <div className="col-12 col-md-6 mb-2 mb-lg-0">
                  <label>Middle Name</label>
                  <Input
                    type={"text"}
                    name={"middleName"}
                    style={validationErrors.middleName ? "error" : ""}
                    value={auth.middleName}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  {validationErrors.middleName && (
                    <small className="text-danger">
                      {validationErrors.middleName}
                    </small>
                  )}
                </div>
                <div className="col-12 col-md-6 mb-2 mb-lg-0">
                  <label>Email</label>
                  <Input
                    type={"text"}
                    name={"email"}
                    style={validationErrors.email ? "error" : ""}
                    value={auth.email}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  {validationErrors.email && (
                    <small className="text-danger">
                      {validationErrors.email}
                    </small>
                  )}
                </div>
              </div>
              <div className="mb-2">
                <label>Password</label>
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
                <div id="password" className="form-text">
                  Your password must be 8-20 characters long, contain atleast
                  one capital letters, numbers, and special characters
                </div>
              </div>
              <div className="mb-2">
                <label>Confirm Password</label>
                <div className="position-relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name={"confirmPassword"}
                    style={validationErrors.confirmPassword ? "error" : ""}
                    value={auth.confirmPassword}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <TogglePassword
                    showPassword={showConfirmPassword}
                    handleTogglePassword={handleToggleConfirmPassword}
                  />
                </div>
                {validationErrors.confirmPassword && (
                  <small className="text-danger">
                    {validationErrors.confirmPassword}
                  </small>
                )}
              </div>
              <ButtonAction
                style={"btn btn-primary mt-4 mb-3 w-100"}
                type={"submit"}
                label={"Register"}
                isLoading={isLoading}
              />
              <p className="mb-0 text-center">
                Already have an account?
                <Link to="/login" className="text-primary ms-1">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
