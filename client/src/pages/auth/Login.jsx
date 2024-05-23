import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

// Component
import Input from "../../components/form/Input";
import ButtonAction from "../../components/button/ButtonAction";
import TogglePassword from "../../components/form/TogglePassword";
import MessageBox from "../../components/form/MessageBox";
import Logo from "../../components/form/Logo";
import Title from "../../components/form/Title";

// Redux
import { useLoginMutation } from "../../services/redux/api/authApiSlice";
import { setCredentials } from "../../services/redux/slice/authSlice";

const Login = () => {
  const initialize = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(initialize);
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [message, setMessage] = useState();

  // Validation errors
  const validateField = (fieldName, value) => {
    let errors = { ...validationErrors };

    switch (fieldName) {
      case "email":
        errors.email = value.trim() === "" ? "Email is required" : "";
        break;

      case "password":
        errors.password = value.trim() === "" ? "Password is required" : "";
        break;
    }

    setValidationErrors(errors);
  };

  // Error when leave input
  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  // Change data and error when change
  const handleChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  // Show / Hide password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Submit to server
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(auth).unwrap();
      dispatch(setCredentials(response));

      if (response.role === "Admin") {
        navigate("/admin/dashboard");
      } else if (response.role === "Super Admin") {
        navigate("/super/admin-account");
      } else {
        navigate("/user/dashboard");
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
        setMessage({
          type: "danger",
          text: err.data.errorMessage,
        });
      }
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="row my-5">
          <div className="col-12 col-md-7 col-lg-5 p-4 rounded-3 mx-auto bg-white wrapper">
            <Logo />
            <Title title={"Login"} subtitle={"Please sign into your account"} />
            {message && (
              <MessageBox
                type={message.type}
                text={message.text}
                handleClick={() => setMessage(null)}
              />
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
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
              </div>
              <div className="text-end">
                <Link to="/forgot-password">
                  <span className="text-black-50">Forgot password?</span>
                </Link>
              </div>
              <ButtonAction
                style={"btn btn-primary mt-4 mb-3 w-100"}
                type={"submit"}
                label={"Login"}
                isLoading={isLoading}
              />
              <p className="mb-0 text-center">
                Don't have an account?
                <Link to="/register" className="text-primary ms-1">
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

export default Login;
