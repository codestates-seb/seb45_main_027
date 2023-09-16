import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MyInfoContentList from "./MyInfoContentList";
import UserProfile from "./UserProfile";
import UserAccount from "../accountSetting/UserAccount";
import axios from "axios";

const MyInfoLayout = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const { id } = useParams();

  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const toggleAccountSettings = (isOpen) => {
    setShowAccountSettings(isOpen);
  };

  const accessToken = localStorage.getItem("accessToken");

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`${baseURL}/members/${id}`, {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : '', 
          "ngrok-skip-browser-warning": "69420",
        },});

      setProfileData(response.data.data);
      console.log('profileData: ', profileData)
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  console.log('profileData2: ', profileData)


  useEffect(() => {
    fetchProfileData();
  }, [id]);


  return (
    <div>
      <div className="flex flex-col justify-center mb-[10%] px-4 w-full md:flex-row">
        {!showAccountSettings && (
          <>
            <UserProfile
              toggleAccountSettings={toggleAccountSettings}
              profileData={profileData}
            />
            <MyInfoContentList />
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
