import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Component
import Input from "../../components/form/Input";
import ButtonAction from "../../components/button/ButtonAction";
import Logo from "../../components/form/Logo";
import Title from "../../components/form/Title";

// Redux
import {
  useResendOTPMutation,
  useVerifyOTPMutation,
} from "../../services/redux/api/authApiSlice";

const OTPVerification = () => {
  const initialize = {
    firstName: "",
    middleName: "",
    lastName: "",
    passwordHash: "",
    email: "",
    otp: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const [resendOTP] = useResendOTPMutation();
  const [auth, setAuth] = useState(initialize);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [validationErrors, setValidationErrors] = useState({});

  // Validation errors
  const validateField = (fieldName, value) => {
    let errors = { ...validationErrors };

    switch (fieldName) {
      case "otp":
        errors.otp = value.trim() === "" ? "OTP is required" : "";
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

  // Change data and error when change
  const handleChange = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  // Mount the data into auth
  useEffect(() => {
    if (userInfo) {
      const { firstName, middleName, lastName, passwordHash, email } = userInfo;
      setAuth({
        firstName: firstName || "",
        middleName: middleName || "",
        lastName: lastName || "",
        passwordHash: passwordHash || "",
        email: email || "",
        otp: "",
      });
    }
  }, [userInfo]);

  // Verify the OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyOTP(auth).unwrap();
      dispatch(setCredentials({ ...response }));
      toast.success("User Created Successfully");
      navigate("/login");
    } catch (err) {
      const responseError = err.data;
      if (responseError && responseError.errors) {
        const serverErrors = responseError.errors.reduce((acc, curr) => {
          acc[curr.field] = curr.message;
          return acc;
        }, {});
        setValidationErrors(serverErrors);
      } else {
        toast.error(responseError.errorMessage);
      }
    }
  };

  // Resend the OTP
  const handleResend = async () => {
    try {
      setIsResendDisabled(true);
      await resendOTP({ email: auth.email }).unwrap();
      toast.success("Resent OTP to your email");
    } catch (err) {
      toast.error(err.data.errorMessage);
    } finally {
      let seconds = 60;
      const interval = setInterval(() => {
        setCountdown(seconds);
        seconds--;

        if (seconds < 0) {
          setIsResendDisabled(false);
          clearInterval(interval);
        }
      }, 1000);
    }
  };

  return (
    <div className="auth">
      <div className="container">
        <div className="row my-5">
          <div className="col-12 col-md-7 col-lg-5 p-4 rounded-3 mx-auto bg-white wrapper">
            <Logo />
            <Title
              title={"Email Verification"}
              subtitle={`Please enter the OTP (One-Time Password) sent to your email`}
            />
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label>Enter OTP</label>
                <Input
                  type={"text"}
                  name={"otp"}
                  style={validationErrors.otp ? "error" : ""}
                  value={auth.otp}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                {validationErrors.otp && (
                  <small className="text-danger">{validationErrors.otp}</small>
                )}
              </div>
              <div className="text-center">
                <ButtonAction
                  style={"text-black-50 btn btn__disabled"}
                  type={"button"}
                  handleClick={handleResend}
                  label={
                    isResendDisabled
                      ? `Resending OTP... (${countdown}s)`
                      : "Resend OTP"
                  }
                  isLoading={isResendDisabled}
                />
              </div>
              <ButtonAction
                style={"btn btn-primary mt-4 mb-3 w-100"}
                type={"submit"}
                label={"Submit"}
                isLoading={isLoading}
              />
              <p className="mb-0 text-center">
                <Link
                  to="/register"
                  className="text-black-50 text-decoration-none"
                >
                  Back to register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
