import { ClipLoader } from "react-spinners";

const MainLoading = () => {
  return (
    <>
      <div className="laoding d-flex justify-content-center flex-column text-center">
        <div className="text-center mb-3">
          <ClipLoader color="#0d6efd" size={50} />
        </div>
        <p className="mb-0 fs-4 text-primary me-1">SleepWell</p>
      </div>
    </>
  );
};

export default MainLoading;
