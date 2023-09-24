import React from "react";

const CommentPaginationTips = ({ currentPage, totalPages, onPageChange }) => {
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoBack}
        className={`bg-[#d1d5db] hover:bg-[#e4e4e7] text-white font-bold py-2 px-4 shadow rounded ${
          !canGoBack ? "cursor-default" : ""
        }`}>
        {"<"}
      </button>
      <button>
        <span className="bg-[#0891b2] text-white font-bold py-2 px-4 mx-6 shadow rounded">
          {currentPage}
        </span>
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoForward}
        className={`bg-[#d1d5db] hover:bg-[#e4e4e7] text-white font-bold py-2 px-4 shadow rounded ${
          !canGoForward ? "cursor-default" : ""
        }`}>
        {">"}
      </button>
    </div>
  );
};

export default CommentPaginationTips;
