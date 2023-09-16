import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MyInfoContentList from "./MyInfoContentList";
import UserProfile from "./UserProfile";
import UserAccount from "../accountSetting/UserAccount";
//import axios from "axios";
import api from "../common/tokens";

const MyInfoLayout = () => {
  //const baseURL = process.env.REACT_APP_API_URL;
  const { id } = useParams();

  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [myinfoData, setMyinfoData] = useState(null);
  const [followingList, setFollowingList] = useState("");
  const [followersList, setFollowersList] = useState("");

  const toggleAccountSettings = (isOpen) => {
    setShowAccountSettings(isOpen);
  };

  //const accessToken = localStorage.getItem("accessToken");

  const fetchProfileData = async () => {
    try {
      const response = await api.get(`/members/${id}`, {
        headers: {
          //Authorization: accessToken ? `Bearer ${accessToken}` : '',
          "ngrok-skip-browser-warning": "69420",
        },
      });

      setProfileData(response.data.data);
      console.log("profileData: ", profileData);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const fetchMyinfoData = async () => {
    try {
      const response = await api.get(`/myContent/search/${id}`, {
        headers: {
          //Authorization: accessToken ? `Bearer ${accessToken}` : "",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      setMyinfoData(response.data.data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const fetchFollowData = async () => {
    try {
      const [followingResponse, followersResponse] = await Promise.all([
        api.get(`/follow/from/${id}`),
        api.get(`/follow/to/${id}`, {
          headers: {
            //Authorization: accessToken ? `Bearer ${accessToken}` : "",
            "ngrok-skip-browser-warning": "69420",
          },
        }),
      ]);

      setFollowingList(followingResponse.data.data);
      setFollowersList(followersResponse.data.data);

      // console.log("Following data", followingResponse.data);
      // console.log("Following data.data", followingResponse.data.data);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  useEffect(() => {
    fetchFollowData();
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    fetchMyinfoData();
  }, []);

  if (!profileData || !myinfoData || !followingList || !followersList) {
    return (
      <div className="flex justify-center h-auto">
        <img
          src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/loading.gif"
          alt="로딩중"
        />
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col justify-center mb-[10%] px-4 w-full md:flex-row">
        {!showAccountSettings && (
          <>
            <UserProfile
              toggleAccountSettings={toggleAccountSettings}
              profileData={profileData}
              followingList={followingList}
              followersList={followersList}
              fetchFollowData={fetchFollowData}
            />
            <MyInfoContentList
              myinfoData={myinfoData}
              fetchMyinfoData={fetchMyinfoData}
            />
          </>
        )}
      </div>
      {showAccountSettings && (
        <UserAccount
          toggleAccountSettings={toggleAccountSettings}
          userDetails={profileData}
        />
      )}
    </div>
  );
};

export default MyInfoLayout;
