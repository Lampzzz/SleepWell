import { PulseLoader } from "react-spinners";

const TableLoading = ({ isLoading }) => {
  return (
    <div className="text-center mt-5 pt-5">
      <PulseLoader color={"#ececec"} loading={isLoading} size={20} />
    </div>
  );
};

export default TableLoading;
