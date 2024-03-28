import { FiEye, FiEyeOff } from "react-icons/fi";

const TogglePassword = ({ showPassword, handleTogglePassword }) => {
  return (
    <>
      {showPassword ? (
        <FiEye
          className="eye-icon text-black-50"
          onClick={handleTogglePassword}
          size={17}
        />
      ) : (
        <FiEyeOff
          className="eye-icon text-black-50"
          onClick={handleTogglePassword}
          size={17}
        />
      )}
    </>
  );
};

export default TogglePassword;
