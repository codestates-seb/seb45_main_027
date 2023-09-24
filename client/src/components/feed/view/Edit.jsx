import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const button = "bg-white hover:bg-gray-100 py-2 px-4 shadow rounded";

const Edit = ({ feedData }) => {
  const { feedId, tipId } = useParams(); // useParams를 사용하여 feedId, tipId를 가져옴
  const navigate = useNavigate();
  let configParams;

  if (feedId) {
    // feedId만 있는 경우
    configParams = {
      method: "DELETE",
      url: `/feed/${feedId}`, // feedId만 포함된 URL
    };
  } else if (tipId) {
    // tipId만 있는 경우
    configParams = {
      method: "DELETE",
      url: `/tip/${tipId}`, // tipId만 포함된 URL
    };
  }

  const [res, err, loading, fetchData] = useAxios(configParams, false);

  // 수정로직
  const handleEditClick = async ({ feedId, tipId }) => {
    if (feedId) {
      navigate(`/showroom/${feedId}/edit`);
    } else if (tipId) {
      navigate(`/tips/${tipId}/edit`);
    }
  };

  // 삭제 버튼 클릭 시 경고창을 띄우고 확인 후 서버 통신 로직 실행
  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");

    if (confirmDelete) {
      try {
        // useAxios 훅을 사용하여 DELETE 요청 보내기
        await fetchData();

        if (!err) {
          toast.success("삭제 요청이 성공했습니다."); // 성공 메시지를 toast로 표시
          // 뒤로가기
          if (feedId) {
            navigate("/showroom");
          } else {
            navigate("/tips");
          }
        } else {
          toast.error("삭제 요청 중 오류가 발생했습니다."); // 오류 메시지를 toast로 표시
        }
      } catch (error) {
        console.error("삭제 요청 중 오류가 발생했습니다.", error);
      }
    }
  };

  return (
    <div className="flex justify-end w-full mt-5">
      <button
        className={button}
        onClick={() => handleEditClick({ feedId, tipId })}
      >
        <span className="text-xl">수정하기</span>
      </button>

      <button className={`${button} ml-4`} onClick={handleDeleteClick}>
        <span className="text-xl">삭제하기</span>
      </button>
    </div>
  );
};

export default Edit;
