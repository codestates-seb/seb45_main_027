import React from "react";

const UserInfoFollowList = () => {
  return (
    <div>
      <div className="flex mb-10">
        <button>Following</button>
        <button>Followers</button>
      </div>
      <div className="flex">
        <img className="h-14 rounded-full" src="./images/Hanjun.png" alt="" />
        <div>Nick name</div>
        <button>Following</button>
      </div>
    </div>
  );
};

export default UserInfoFollowList;
