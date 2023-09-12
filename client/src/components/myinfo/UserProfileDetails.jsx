import React from "react";

const UserProfileDetails = ({ toggleAccountSettings, userDetails }) => {
  return (
    <div className="flex flex-row justify-center items-center md:flex-col md:mb-6 ">
      {userDetails && (
        <>
          <img
            className="flex items-center rounded-full object-cover w-[75px] h-[75px] m-2.5 md:mt-10 md:mb-6 md:w-[140px] md:h-[140px] xl:w-[160px] xl:h-[160px]"
            src={
              userDetails[0].profilePicture
                ? userDetails[0].profilePicture
                : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/user.png"
            }
            alt="profile"
          />
          <div className="flex flex-col justify-center items-start md:items-center">
            <div className="text-md pb-1 md:text-2xl font-bold">
              {userDetails[0].username}
            </div>
            <div className="text-sm pb-4 md:mx-16 md:my-4 break-all">
              {userDetails[0].bio}
            </div>
            <button
              className="bg-[#00647B] text-white font-semibold hover:bg-[#00647B]/50 rounded-full p-1 md:p-2 text-xs md:text-md"
              onClick={() => toggleAccountSettings(true)}>
              계정설정
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfileDetails;
