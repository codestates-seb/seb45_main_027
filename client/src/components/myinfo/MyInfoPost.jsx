import React from "react";
import { useParams } from "react-router-dom";

const MyInfoPost = ({
  imgSrc,
  title,
  itemId,
  deletePost,
  label,
  postNavigate,
}) => {
  const { id } = useParams();
  const memberId = localStorage.getItem("memberId");

  return (
    <div className="m-2 h-full w-[140px] md:w-[150px] xl:w-[170px] text-[#57534e]">
      <div className="relative">
        <img
          className="rounded-lg object-cover w-[130px] h-[120px] md:w-[150px] md:h-[135px]  xl:w-[170px] xl:h-[155px]"
          src={imgSrc}
          alt="content"
          onClick={() => postNavigate(itemId, label)}
        />
      </div>
      <div className="flex flex-col items-center md:mb-4">
        <div
          className="text-lg font-semibold p-2 max-w-[130px] lg:max-w-[150px] truncate overflow-hidden"
          onClick={() => postNavigate(itemId, label)}
        >
          {title}
        </div>
        {id === memberId && (
          <div className="flex flex-row text-[#57534e] text-xs">
            <button className="flex">
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
