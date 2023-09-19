import React from "react";
import { useParams } from "react-router-dom";

const MyInfoPost = ({
  imgSrc,
  title,
  itemId,
  deletePost,
  label,
  postNavigate,
  handleEditNavigate,
}) => {
  const { id } = useParams();
  const memberId = localStorage.getItem("memberId");

  return (
    <div className="
    m-2 text-[#57534e] 
    h-full w-[150px] 
    sm:w-[170px] md:w-[110px] lg:w-[140px] xl:w-[170px]">
      <div className="relative">
        <img
          className="
          rounded-lg object-cover cursor-pointer
          w-[170px] h-[130px] 
          sm:w-[170px] sm:h-[145px] 
          md:w-[110px] md:h-[100px] 
          lg:w-[140px] lg:h-[120px] 
          xl:w-[170px] xl:h-[150px]"
          src={imgSrc}
          alt="content"
          onClick={() => postNavigate(itemId, label)}
        />
      </div>
      <div className="flex flex-col items-center md:mb-4">
        <div
          className="text-lg font-semibold p-2 max-w-[130px] lg:max-w-[150px] truncate overflow-hidden cursor-pointer"
          onClick={() => postNavigate(itemId, label)}
        >
          {title}
        </div>
        {id === memberId && (
          <div className="flex flex-row text-[#57534e] text-xs">
            <button
              onClick={() => handleEditNavigate(itemId, label)}
              className="flex"
            >
              <img
                src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/edit.png"
                alt="edit"
                className="mx-0.5 w-[12px]"
              />
              <div>수정</div>
            </button>
            <button onClick={() => deletePost(itemId, label)} className="flex">
              <img
                src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/remove.png"
                alt="remove"
                className="ml-2 mr-0.5 w-[10px] h-[12px]"
              />
              <div>삭제</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInfoPost;
