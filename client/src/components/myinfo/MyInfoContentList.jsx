import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyInfoShowroom from "./MyInfoShowroom";
import axios from "axios";

const MyInfoContentList = () => {
  const { id } = useParams();

  const [myinfoData, setMyinfoData] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchMyinfoData = async () => {
      try {
        const response = await axios.get(`${baseURL}/myContent/search/${id}`, {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
            "ngrok-skip-browser-warning": "69420",
          },
        });

        setMyinfoData(response.data.data);
        //console.log('myposts data.data',response.data.data)
      } catch (err) {
        console.log("Error: ", err);
      }
    };
    fetchMyinfoData();
  }, []);
  //console.log('myinfoData', myinfoData)
  console.log("myinfoData.showRoom", myinfoData.showRoom);
  console.log("myinfoData.tipContent", myinfoData.tipContent);

  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {}, [activeTab]);

  const handleTabs = (tabIdx) => {
    setActiveTab(tabIdx);
  };

  const tabStyle = (tabIndex) =>
    `${
      activeTab === tabIndex
        ? "text-[#F5634A] border-[#F5634A]/20"
        : "text-neutral-600"
    } text-xl font-bold border-b-4 border-transparent cursor-pointer px-4 py-2 mb-[3%] mr-[6%] md:text-xl`;

  if (!myinfoData) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex-col bg-white rounded-md w-full shadow-md mb-6 pl-[4%] pt-[2%] 2xl:w-[70%] md:min-h-[800px] md:my-[2%] 2xl:min-w-[800px]">
      <ul className="flex md:mb-[2%]">
        <li className={tabStyle(1)} onClick={() => handleTabs(1)}>
          게시글
        </li>
        <li className={tabStyle(2)} onClick={() => handleTabs(2)}>
          북마크
        </li>
        <li className={tabStyle(3)} onClick={() => handleTabs(3)}>
          좋아요
        </li>
      </ul>
      <div className="flex flex-col flex-wrap ">
        {Array.isArray(myinfoData.showRoom) &&
        myinfoData.showRoom.length > 0 ? (
          myinfoData.showRoom.map((item, idx) => (
            <div
              key={idx}
              className="text-[#F5634A] text-3xl font-bold mb-[2%]"
            >
              Show room
              <MyInfoShowroom
                postData={item.post}
                bookmarkData={item.bookmark}
                likeData={item.like}
                activeTab={activeTab}
              />
            </div>
          ))
        ) : (
          <div>No show room data available</div>
        )}
        {Array.isArray(myinfoData.tipContent) &&
        myinfoData.tipContent.length > 0 ? (
          myinfoData.tipContent.map((item, idx) => (
            <div
              key={idx}
              className="text-[#F5634A] text-3xl font-bold mb-[2%]"
            >
              Tips
              <MyInfoShowroom
                postData={item.post}
                bookmarkData={item.bookmark}
                likeData={item.like}
                activeTab={activeTab}
              />
            </div>
          ))
        ) : (
          <div>No tip content available</div>
        )}
      </div>
    </div>
  );
};

export default MyInfoContentList;
