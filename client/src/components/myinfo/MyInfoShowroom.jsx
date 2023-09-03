import React, { useState, useEffect } from "react";
//import Pagination from "./Pagination";
import MyInfoPost from "./MyInfoPost";
import MyInfoBookmark from "./MyInfoBookmark";
import MyInfoLike from "./MyInfoLike";

const MyInfoShowroom = ({ postData, bookmarkData, likeData, activeTab }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 4;

  // const totalPages = Math.ceil(showroomData.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const visibleData = showroomData.slice(startIndex, startIndex + itemsPerPage);

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };
  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const shouldShowPagination = showroomData.length > itemsPerPage;

  
  const [isPostDeleted, setIsPostDeleted] = useState(postData);
  const [isBookmarked, setIsBookmarked] = useState(bookmarkData);
  const [isLiked, setIsLiked] = useState(likeData);

  const deletePost = (itemId) => {
    const updatedPosts = isPostDeleted.filter((item) => item.id !== itemId);
    setIsPostDeleted(updatedPosts);
    console.log(isPostDeleted);
  };

  const toggleBookmark = (itemId) => {
    const updatedBookmarks = isBookmarked.filter((item) => item.id !== itemId);
    setIsBookmarked(updatedBookmarks);
    console.log(isBookmarked);
  };

  const toggleLike = (itemId) => {
    const updatedLikes = isLiked.filter((item) => item.id !== itemId);
    setIsLiked(updatedLikes);
    console.log(isLiked);
  };

  return (
    <div className="md:min-h-[380px]">
      <div className="text-[#F5634A] text-4xl font-bold mb-[2%]">Show Room</div>
        <div className="flex flex-wrap justify-center items-start">
          {/* {visibleData.map((item) => (
            <div key={item.id}>
              <MyInfoContent
                imgSrc={item.imgSrc}
                title={item.title}
                isBookmarked={item.bookmarked}
                itemId={item.id}
              />
            </div>
          ))} */}
          {activeTab === 1 && isPostDeleted.map((item) => (
            <div key={item.id}>
              <MyInfoPost
                imgSrc={item.imgSrc}
                title={item.title}
                itemId={item.id}
                deletePost={deletePost}

              />
            </div>
          ))}
          {activeTab === 2 && isBookmarked.map((item) => (
            <div key={item.id}>
              <MyInfoBookmark
                imgSrc={item.imgSrc}
                title={item.title}
                itemId={item.id}
                isBookmarked={item.bookmarked}
                toggleBookmark={toggleBookmark}
              />
            </div>
          ))}
          {activeTab === 3 && isLiked.map((item) => (
            <div key={item.id}>
              <MyInfoLike
                imgSrc={item.imgSrc}
                title={item.title}
                itemId={item.id}
                isLiked={item.like}
                toggleLike={toggleLike}
              />
            </div>
          ))}
        </div>
        {/* {shouldShowPagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        )} */}
    </div>
  );
};

export default MyInfoShowroom;
