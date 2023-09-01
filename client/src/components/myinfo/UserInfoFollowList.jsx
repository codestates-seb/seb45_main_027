import React from "react";

const UserInfoFollowList = ({ userList }) => {
  const handleFollow = (userId) => {
    console.log(`Follow user with ID ${userId}`);
  };

  const handleUnfollow = (userId) => {
    console.log(`Unfollow user with ID ${userId}`);
  };

  return (
    <div>
      {userList.map((user) => (
        <div key={user.id} className="flex justify-between mx-3 mb-1.5">
          <div className="flex">
            <img
              className="h-12 w-12 object-cover rounded-full"
              src={user.profileImage}
              alt={user.username}
            />
            <button className="mx-2.5 font-md truncate overflow-hidden max-w-[85px]">
              {user.username}
            </button>
          </div>
          <button
            className="text-xs text-white font-bold"
            onClick={() => {
              if (user.isFollowing) {
                handleUnfollow(user.id);
              } else {
                handleFollow(user.id);
              }
            }}
          >
            <span className="bg-[#5AB0C3] rounded-full p-1.5">{user.isFollowing ? "Following" : "Follow"}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserInfoFollowList;
