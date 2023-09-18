import React from "react";

const CommentPagination = ({ currentPage, totalPages, onPageChange }) => {
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoBack}
        className={`bg-[#d1d5db] hover:bg-[#e4e4e7] text-white font-bold px-2.5 py-1.5 rounded-lg ${
          !canGoBack ? "cursor-not-allowed" : ""
        }`}
      >
        Prev
      </button>
      <span className="bg-[#0891b2] text-white font-bold px-2.5 py-1.5 mx-4 rounded-lg">
        {currentPage}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoForward}
        className={`bg-[#d1d5db] hover:bg-[#e4e4e7] text-white font-bold px-2.5 py-1.5 rounded-lg ${
          !canGoForward ? "cursor-not-allowed" : ""
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default CommentPagination;
