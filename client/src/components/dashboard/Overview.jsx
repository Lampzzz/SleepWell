const Overview = ({ bgColor, label, analysis, icon }) => {
  return (
    <div className="col-12 col-md-5 col-lg-3 mb-5 mb-lg-0">
      <div className="shadow-sm position-relative bg-white rounded-3 px-3 py-2">
        <div className="d-flex justify-content-end">
          <div
            className="dashboard__icon p-3"
            style={{ backgroundColor: bgColor }}
          >
            <img
              src={`../../src/assets/image/${icon}`}
              alt={label}
              style={{ width: "30px", height: "30px" }}
            />
          </div>
          <div className="text-end">
            <small className="mb-2 d-block">{label}</small>
            <h2>{analysis}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
