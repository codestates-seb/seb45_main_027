import React from "react";

const UserInfoFollowList = ({ userList, handleFollow, handleUnfollow, activeTab }) => {
  console.log('userList', userList);

  return (
    <div>
      {userList.map((user) => (
        <div key={activeTab === 'following' ? user.memberId : user.fromMemberId} className="flex justify-between pl-5 pr-3 mb-1.5 ">
          <div className="flex">
            <img
              className="h-12 w-12 object-cover rounded-full"
              src={activeTab === 'following' ? user.memberImage : user.memberImage}
              alt={user.memberNickname}
            />
            <button className="mx-2.5 font-md truncate overflow-hidden max-w-[85px]">
              {activeTab === 'following' ? user.memberNickname : user.fromMemberNickname}

            </button>
          </div>
          <button
            className="text-xs text-white font-bold"
            onClick={() => {
              if (!user.followYn) {
                handleFollow(user.memberId);
              } else {
                handleUnfollow(user.memberId);
              }
            }}
          >
            <span className="bg-[#00647B]/80 rounded-full p-1.5">{user.followYn ? "Following" : "Follow"}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserInfoFollowList;
