const Textarea = ({ name, value, handleChange, required }) => {
  return (
    <textarea
      name={name}
      className="form-control"
      value={value}
      onChange={handleChange}
      {...(required && { required: true })}
      style={{ resize: "none", height: "150px" }}
    ></textarea>
  );
};

export default Textarea;
