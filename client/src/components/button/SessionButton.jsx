const SessionButton = ({ label, action }) => {
  return (
    <div className="position-relative">
      <button className="btn btn-primary" onClick={action}>
        {label}
      </button>
    </div>
  );
};

export default SessionButton;
