const HighestData = ({ label, columnName, displayData }) => {
  return (
    <div className="col-12 col-lg-6 mx-auto mb-5 mb-lg-0">
      <div className="shadow-sm p-3 rounded-3 bg-white">
        <h6 className="mb-3">{label}</h6>
        <div className="table-responsive">
          <table className="table table-hover table-borderless table--custom mb-0">
            <thead>
              <tr>
                <td>No.</td>
                <td>Full Name</td>
                <td>{columnName}</td>
                <td>Date</td>
              </tr>
            </thead>
            <tbody>{displayData}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HighestData;
