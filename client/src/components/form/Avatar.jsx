import { MdOutlineCameraAlt } from "react-icons/md";

const Avatar = ({ src, handleChange }) => {
  return (
    <div className="text-center mb-5 position-relative">
      <img
        src={src}
        style={{ width: "150px", height: "150px" }}
        className="rounded-circle"
      />
      <div className="upload-icon">
        <button className="btn btn-primary" type="button">
          <MdOutlineCameraAlt color="white" size={20} />
        </button>
        <input
          type="file"
          className="input-file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Avatar;
