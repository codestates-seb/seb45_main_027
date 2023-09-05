import React from "react";

const UserProfileDetails = ({ toggleAccountSettings, userDetails }) => {
  
  return (
    <div className="flex flex-row md:items-center md:flex-col md:mb-6 ">
      {userDetails &&
        <>
            <div className="mt-10 mb-6">
              <img
                className="rounded-full object-cover w-[80px] h-[80px] md:w-[140px] md:h-[140px] xl:w-[160px] xl:h-[160px]"
                src={userDetails[0].profilePicture ? userDetails[0].profilePicture : './images/user.png'}
                alt="profile"
              />
            </div>
            <div className="flex flex-col md:items-center">
              <div className="text-2xl font-bold">{userDetails[0].username}</div>
              <div className="mx-16 my-4 break-all">{userDetails[0].bio}</div>
              <button
                className="bg-[#00647B] text-white font-bold hover:bg-[#00647B]/50 rounded-full p-2 mt-4"
                onClick={() => toggleAccountSettings(true)}
              >
                계정설정
              </button>
            </div>
          </>
        }
    </div>
  );
};

export default UserProfileDetails;
