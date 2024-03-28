const MessageBox = ({ type, text, handleClick }) => {
  return (
    <div
      className={`alert alert-${type} alert-dismissible fade show`}
      role="alert"
    >
      <p className="mb-0">{text}</p>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={handleClick}
      ></button>
    </div>
  );
};

export default MessageBox;
