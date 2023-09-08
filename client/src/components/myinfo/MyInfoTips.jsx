import { useState } from "react";
import Pagination from "./Pagination";
import MyInfoPost from "./MyInfoPost";
import MyInfoBookmark from "./MyInfoBookmark";
import MyInfoLike from "./MyInfoLike";

const MyInfoTips = ({ postData, bookmarkData, likeData, activeTab }) => {
   // 게시글, 북마크, 삭제 부분
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
 
 
  // 페이지네이션 부분
   const [postPage, setPostPage] = useState(1);
   const [bookmarkPage, setBookmarkPage] = useState(1);
   const [likePage, setLikePage] = useState(1);
   const itemsPerPage = 4;
 
   const visiblePosts = isPostDeleted.slice(
     (postPage - 1) * itemsPerPage,
     postPage * itemsPerPage
   );
 
   const visibleBookmarks = isBookmarked.slice(
     (bookmarkPage - 1) * itemsPerPage,
     bookmarkPage * itemsPerPage
   );
 
   const visibleLikes = isLiked.slice(
     (likePage - 1) * itemsPerPage,
     likePage * itemsPerPage
   );
 
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
 
   return (
     <div className="md:min-h-[300px]">
       <div className="text-[#F5634A] text-3xl font-bold mb-[2%]">Tips</div>
       <div className="flex flex-wrap">
         {activeTab === 1 &&
           visiblePosts.map((item) => (
             <div key={item.id}>
               <MyInfoPost
                 imgSrc={item.imgSrc}
                 title={item.title}
                 itemId={item.id}
                 deletePost={deletePost}
               />
             </div>
           ))}
         {activeTab === 2 &&
            visibleBookmarks.map((item) => (
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
         {activeTab === 3 &&
           visibleLikes.map((item) => (
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
          {activeTab === 1 && (
         <Pagination
           currentPage={postPage}
           totalPages={Math.ceil(postData.length / itemsPerPage)}
           onNextPage={() =>
             handleNextPage(postPage, setPostPage, Math.ceil(postData.length / itemsPerPage))
           }
           onPrevPage={() => handlePrevPage(postPage, setPostPage)}
         />
       )}
       {activeTab === 2 && (
         <Pagination
           currentPage={bookmarkPage}
           totalPages={Math.ceil(bookmarkData.length / itemsPerPage)}
           onNextPage={() =>
             handleNextPage(bookmarkPage, setBookmarkPage, Math.ceil(bookmarkData.length / itemsPerPage))
           }
           onPrevPage={() => handlePrevPage(bookmarkPage, setBookmarkPage)}
         />
       )}
       {activeTab === 3 && (
         <Pagination
           currentPage={likePage}
           totalPages={Math.ceil(likeData.length / itemsPerPage)}
           onNextPage={() =>
             handleNextPage(likePage, setLikePage, Math.ceil(likeData.length / itemsPerPage))
           }
           onPrevPage={() => handlePrevPage(likePage, setLikePage)}
         />
       )}
     </div>
   );
 };

export default MyInfoTips;
