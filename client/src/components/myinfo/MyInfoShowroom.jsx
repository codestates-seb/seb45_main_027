import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import MyInfoPost from "./MyInfoPost";
import MyInfoBookmark from "./MyInfoBookmark";
import MyInfoLike from "./MyInfoLike";
import { toast } from "react-hot-toast";
import api from "../common/tokens";

const MyInfoShowroom = ({
  postData = [],
  bookmarkData = [],
  likeData = [],
  activeTab,
  handleFollowAction,
  label,
}) => {
  const navigate = useNavigate();

  // 게시글, 북마크, 삭제 부분
  const deletePost = async (itemId, label) => {
    let url = "";
    if (label === "showroom") {
      url = `/feed/${itemId}`;
    }
    if (label === "tips") {
      url = `/tip/${itemId}`;
    }
    const confirmDeletion = window.confirm(
      `${itemId} ${label}Are you sure you want to delete this post? This action cannot be undone.`
    );
    if (confirmDeletion) {
      try {
        await api.delete(url, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        handleFollowAction();
        toast.success("게시글이 삭제되었습니다!");
      } catch {
        toast.error("게시글 삭제에 실패했습니다.");
      }
    }
  };

  const deleteBookmark = async (itemId, label) => {
    let url = "";
    if (label === "showroom") {
      url = `/feed/${itemId}/feedBookMark`;
    }
    if (label === "tips") {
      url = `/tip/${itemId}/tipbookmark`;
    }

    try {
      await api.patch(url, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      handleFollowAction();
      toast.success("북마크가 삭제되었습니다!");
    } catch {
      toast.error("북마크 삭제에 실패했습니다.");
    }
  };

  const deleteLike = async (itemId, label) => {
    let url = "";
    if (label === "showroom") {
      url = `/feed/${itemId}/feedlike`;
    }
    if (label === "tips") {
      url = `/tip/${itemId}/tiplike`;
    }

    try {
      await api.patch(url, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      handleFollowAction();
      toast.success("좋아요가 해제되었습니다!");
    } catch {
      toast.error("좋아요 취소에 실패했습니다.");
    }
  };

  const postNavigate = (itemId, label) => {
    navigate(`/${label}/${itemId}`);
  };

  const handleEditNavigate = async (itemId, label) => {
    navigate(`/${label}/${itemId}/edit`);
  };

  // 페이지네이션 부분
  const [postPage, setPostPage] = useState(1);
  const [bookmarkPage, setBookmarkPage] = useState(1);
  const [likePage, setLikePage] = useState(1);
  const itemsPerPage = 4;

  const visiblePosts = postData
    ? postData.slice((postPage - 1) * itemsPerPage, postPage * itemsPerPage)
    : [];

  const visibleBookmarks = bookmarkData
    ? bookmarkData.slice(
        (bookmarkPage - 1) * itemsPerPage,
        bookmarkPage * itemsPerPage
      )
    : [];

  const visibleLikes = likeData
    ? likeData.slice((likePage - 1) * itemsPerPage, likePage * itemsPerPage)
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

  // console.log("visiblePosts", visiblePosts);
  // console.log("visibleBookmarks", visibleBookmarks);
  // console.log("visibleLikes", visibleLikes);

  const noContentStyle =
    "flex items-center p-28 text-md md:text-2xl text-[#00647B]/90 font-semibold Showcard-Gothic";

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center md:h-[180px] lg:h-[200px] xl:h-[230px]">
        {activeTab === 1 &&
          visiblePosts.map((item, idx) => (
            <MyInfoPost
              key={idx}
              label={label}
              imgSrc={item.coverPhoto}
              title={item.title}
              itemId={item.feedId || item.tipId}
              deletePost={deletePost}
              postNavigate={postNavigate}
              handleEditNavigate={handleEditNavigate}
            />
          ))}
        {activeTab === 2 &&
          visibleBookmarks.map((item, idx) => (
            <MyInfoBookmark
              key={idx}
              label={label}
              imgSrc={item.coverPhoto}
              title={item.title}
              itemId={item.feedId || item.tipId}
              isBookmarked={item.bookMarkYn}
              deleteBookmark={deleteBookmark}
              postNavigate={postNavigate}
            />
          ))}
        {activeTab === 3 &&
          visibleLikes.map((item, idx) => (
            <MyInfoLike
              key={idx}
              label={label}
              imgSrc={item.coverPhoto}
              title={item.title}
              itemId={item.feedId || item.tipId}
              isLiked={item.likeYn}
              deleteLike={deleteLike}
              postNavigate={postNavigate}
            />
          ))}
        {activeTab === 1 && postData.length === 0 && (
          <div className={noContentStyle}>No Content!</div>
        )}
        {activeTab === 2 && bookmarkData.length === 0 && (
          <div className={noContentStyle}>No Content!</div>
        )}
        {activeTab === 3 && likeData.length === 0 && (
          <div className={noContentStyle}>No Content!</div>
        )}
      </div>
      <div>
        {activeTab === 1 && postData.length > 0 && (
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
        {activeTab === 2 && bookmarkData.length > 0 && (
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
        {activeTab === 3 && likeData.length > 0 && (
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
