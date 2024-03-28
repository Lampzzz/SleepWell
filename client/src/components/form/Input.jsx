const Input = ({
  type,
  name,
  value,
  handleChange,
  handleBlur,
  style,
  required,
}) => {
  return (
    <input
      type={type}
      className={`form-control shadow-none ${style}`}
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      {...(required && { required: true })}
    />
  );
};

export default Input;
