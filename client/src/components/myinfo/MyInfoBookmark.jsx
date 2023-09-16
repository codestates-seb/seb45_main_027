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
    <div className="m-2 h-full w-[140px] md:w-[150px] xl:w-[170px] text-[#57534e]">
      <div className="relative">
        <img
          className="rounded-lg object-cover w-[130px] h-[120px] md:w-[150px] md:h-[135px]  xl:w-[170px] xl:h-[155px]"
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
            className='w-4 h-4'
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
