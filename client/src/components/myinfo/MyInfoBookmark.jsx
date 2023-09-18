import { useParams } from "react-router-dom";

const MyInfoBookmark = ({
  itemId,
  imgSrc,
  title,
  isBookmarked,
  deleteBookmark,
  label,
  postNavigate,
}) => {
  const { id } = useParams();
  const memberId = localStorage.getItem("memberId");

  return (
    <div
      className="
      m-2 text-[#57534e]
      h-full w-[150px] 
      sm:w-[170px] md:w-[110px] lg:w-[140px] xl:w-[170px]"
    >
      <div className="relative">
        <img
          className="
        rounded-lg object-cover 
        w-[170px] h-[130px] 
        sm:w-[170px] sm:h-[145px] 
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
              deleteBookmark(itemId, label);
            }
          }}
          className="absolute bottom-3 right-3 cursor-pointer"
        >
          <img
            // src={
            //   isBookmarked
            //     ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/isBookmarked.png"
            //     : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/bookmark.png"
            // }
            src={
              "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/isBookmarked.png"
            }
            className="w-4 h-4"
            alt="Bookmark"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </button>
      </div>
      <div className="flex flex-col items-center md:mb-4">
        <div
          className="text-lg font-semibold p-2 max-w-[130px] lg:max-w-[150px] truncate overflow-hidden"
          onClick={() => postNavigate(itemId, label)}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export default MyInfoBookmark;
