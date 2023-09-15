import React, { useState } from "react";
import Pagination from "./Pagination";
import MyInfoPost from "./MyInfoPost";
import MyInfoBookmark from "./MyInfoBookmark";
import MyInfoLike from "./MyInfoLike";
import { toast } from "react-hot-toast";

const MyInfoShowroom = ({
  postData = [],
  bookmarkData = [],
  likeData = [],
  activeTab,
}) => {
  // 게시글, 북마크, 삭제 부분
  const [isPostDeleted, setIsPostDeleted] = useState(postData);
  const [isBookmarked, setIsBookmarked] = useState(bookmarkData);
  const [isLiked, setIsLiked] = useState(likeData);

  const deletePost = (itemId) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );
    if (confirmDeletion) {
      const updatedPosts = isPostDeleted.filter(
        (item) => item.feedId !== itemId
      );
      setIsPostDeleted(updatedPosts);
      toast.success("게시글이 삭제되었습니다!");

      console.log(isPostDeleted);
    }
  };

  const toggleBookmark = (itemId) => {
    const updatedBookmarks = isBookmarked.filter(
      (item) => item.feedId !== itemId
    );
    setIsBookmarked(updatedBookmarks);
    toast.success("북마크가 해제되었습니다!");

    console.log(isBookmarked);
  };

  const toggleLike = (itemId) => {
    const updatedLikes = isLiked.filter((item) => item.feedId !== itemId);
    setIsLiked(updatedLikes);
    toast.success("좋아요가 해제되었습니다!");

    console.log(isLiked);
  };

  // 페이지네이션 부분
  const [postPage, setPostPage] = useState(1);
  const [bookmarkPage, setBookmarkPage] = useState(1);
  const [likePage, setLikePage] = useState(1);
  const itemsPerPage = 4;

  const visiblePosts = isPostDeleted
    ? isPostDeleted.slice(
        (postPage - 1) * itemsPerPage,
        postPage * itemsPerPage
      )
    : [];

  const visibleBookmarks = isBookmarked
    ? isBookmarked.slice(
        (bookmarkPage - 1) * itemsPerPage,
        bookmarkPage * itemsPerPage
      )
    : [];

  const visibleLikes = isLiked
    ? isLiked.slice((likePage - 1) * itemsPerPage, likePage * itemsPerPage)
    : [];

  const handleNextPage = (pageState, setPageState, totalPages) => {
    if (pageState < totalPages) {
      setPageState(pageState + 1);
    }
  };

  const handlePrevPage = (pageState, setPageState) => {
    if (pageState > 1) {
      setPageState(pageState - 1);
    }
  };

  console.log("visiblePosts", visiblePosts);
  console.log(isBookmarked)
  console.log('postdata', postData)

  return (
    <>
      <div className="md:min-h-[210px] md:min-w-[400px] flex flex-row flex-wrap items-start">
        {activeTab === 1 &&
          visiblePosts.map((item, idx) => (
            <MyInfoPost
              key={idx}
              imgSrc={item.coverPhoto}
              title={item.title}
              itemId={item.feedId}
              deletePost={deletePost}
            />
          ))}
        {activeTab === 2 &&
          visibleBookmarks.map((item, idx) => (
            <MyInfoBookmark
              key={idx}
              imgSrc={item.coverPhoto}
              title={item.title}
              itemId={item.feedId}
              isBookmarked={item.bookMarkYn}
              toggleBookmark={toggleBookmark}
            />
          ))}
        {activeTab === 3 &&
          visibleLikes.map((item, idx) => (
            <MyInfoLike
              key={idx}
              imgSrc={item.coverPhoto}
              title={item.title}
              itemId={item.feedId}
              isLiked={item.likeYn}
              toggleLike={toggleLike}
            />
          ))}
      </div>
      <div>
        {activeTab === 1 && (
          <Pagination
            currentPage={postPage}
            totalPages={Math.ceil(postData.length / itemsPerPage)}
            onNextPage={() =>
              handleNextPage(
                postPage,
                setPostPage,
                Math.ceil(postData.length / itemsPerPage)
              )
            }
            onPrevPage={() => handlePrevPage(postPage, setPostPage)}
          />
        )}
        {activeTab === 2 && (
          <Pagination
            currentPage={bookmarkPage}
            totalPages={Math.ceil(bookmarkData.length / itemsPerPage)}
            onNextPage={() =>
              handleNextPage(
                bookmarkPage,
                setBookmarkPage,
                Math.ceil(bookmarkData.length / itemsPerPage)
              )
            }
            onPrevPage={() => handlePrevPage(bookmarkPage, setBookmarkPage)}
          />
        )}
        {activeTab === 3 && (
          <Pagination
            currentPage={likePage}
            totalPages={Math.ceil(likeData.length / itemsPerPage)}
            onNextPage={() =>
              handleNextPage(
                likePage,
                setLikePage,
                Math.ceil(likeData.length / itemsPerPage)
              )
            }
            onPrevPage={() => handlePrevPage(likePage, setLikePage)}
          />
        )}
      </div>
    </>
  );
};

export default MyInfoShowroom;
