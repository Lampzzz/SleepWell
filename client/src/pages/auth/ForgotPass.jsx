import { Link } from "react-router-dom";
import { useState } from "react";

// Component
import Input from "../../components/form/Input";
import ButtonAction from "../../components/button/ButtonAction";
import MessageBox from "../../components/form/MessageBox";
import Logo from "../../components/form/Logo";
import Title from "../../components/form/Title";

// Redux
import { useForgotPasswordMutation } from "../../services/redux/api/authApiSlice";

const ForgotPass = () => {
  const initialize = {
    email: "",
  };

  const [auth, setAuth] = useState(initialize);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [validationErrors, setValidationErrors] = useState({});
  const [message, setMessage] = useState();

  // Validation Errors
  const validateField = (fieldName, value) => {
    let errors = { ...validationErrors };

    switch (fieldName) {
      case "email":
        errors.email = value.trim() === "" ? "Email is required" : "";
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

  // Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await forgotPassword(auth).unwrap();
      setMessage({
        type: "success",
        text: response.successMessage,
      });

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
        console.error("Unexpected error:", err);
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
              title={"Forgot Password"}
              subtitle={`We will send an email to your box, just follow that link to set
                your new password`}
            />
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
              <ButtonAction
                style={"btn btn-primary mt-4 mb-3 w-100"}
                type={"submit"}
                label={"Submit"}
                isLoading={isLoading}
              />
              <p className="mb-0 text-center">
                <Link
                  to="/login"
                  className="text-black-50 text-decoration-none"
                >
                  Back to sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
