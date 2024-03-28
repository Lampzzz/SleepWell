import { LiaLessThanSolid, LiaGreaterThanSolid } from "react-icons/lia";

const PaginationButton = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="d-flex justify-content-center align-items-center mb-3 gap-3">
      <button
        className="btn p-2 shadow-sm border bg-white"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <LiaLessThanSolid />
      </button>
      <span className="mb-0 text-black-50 ">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="btn p-2 shadow-sm border bg-white"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <LiaGreaterThanSolid />
      </button>
    </div>
  );
};

export default PaginationButton;
