import React from "react";

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="mt-4 flex justify-center">
      {!isFirstPage && (
        <button
          onClick={onPrevPage}
          className="px-5 py-1 "
        >
          <img src="./images/arrow.png" alt="previous" className='h-8 w-5 transform rotate-180'/>
        </button>
      )}
      {!isLastPage && (
        <button
          onClick={onNextPage}
          className="px-5 py-1"
        >
          <img src="./images/arrow.png" alt="next" className='h-8 w-5 '/>
          
        </button>
      )}
    </div>
  );
};

export default Pagination;
