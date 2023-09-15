import React from "react";

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  
  return (
    <div className="mb-2 mr-4 flex justify-end">
      <button onClick={onPrevPage} className={`px-5 py-1 ${isFirstPage ? "cursor-not-allowed" : ""}`}>
        <img
          src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/arrow.png"
          alt="previous"
          className="h-6 w-3 transform rotate-180"
        />
      </button>

      <button
        onClick={onNextPage}
        className={`px-5 py-1 ${isLastPage ? "cursor-not-allowed" : ""}`}
      >
        <img src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/arrow.png" alt="next" className="h-6 w-3" />
      </button>
    </div>
  );
};

export default Pagination;
