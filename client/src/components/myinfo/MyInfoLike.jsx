import React from "react";
import { useParams } from "react-router-dom";

const MyInfoLike = ({
  imgSrc,
  title,
  itemId,
  deleteLike,
  isLiked,
  label,
  postNavigate,
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
          sm:w-[210px] sm:h-[145px] 
          md:w-[110px] md:h-[100px] 
          lg:w-[140px] lg:h-[120px] 
          xl:w-[170px] xl:h-[150px]"
          src={imgSrc}
          alt="content"
          onClick={() => postNavigate(itemId, label)}
        />
        <button
          onClick={() => {
            if (id === memberId) {
              deleteLike(itemId, label);
            }
          }}
          className="absolute bottom-3.5 right-3.5 cursor-pointer"
        >
          <img
            // src={
            //   isLiked
            //     ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/isLiked.png"
            //     : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/emptyHeart.png"
            // }
            src={"https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/isLiked.png"}
            alt="Like"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </button>
      </div>
      <div className="flex flex-col items-center md:mb-4">
        <div
          className="text-lg font-semibold p-2 max-w-[130px] lg:max-w-[150px] truncate overflow-hidden cursor-pointer"
          onClick={() => postNavigate(itemId, label)}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default MyInfoLike;
