import React, { useState } from "react";
import MyInfoContent from "./MyInfoContent";
import Pagination from "./Pagination";

const MyInfoShowroom = ({ showroomData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(showroomData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = showroomData.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const shouldShowPagination = showroomData.length > itemsPerPage;

  return (
    <div className="md:min-h-[380px]">
      <div className="text-[#F5634A] text-4xl font-bold mb-[2%]">Show Room</div>
      <div className=''>
        <div className="flex flex-wrap justify-center items-start">
          {visibleData.map((item) => (
            <div key={item.id}>
              <MyInfoContent
                imgSrc={item.imgSrc}
                title={item.title}
                isBookmarked={item.bookmarked}
                itemId={item.id}
              />
            </div>
          ))}
        </div>
        {shouldShowPagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        )}
      </div>
    </div>
  );
};

export default MyInfoShowroom;
