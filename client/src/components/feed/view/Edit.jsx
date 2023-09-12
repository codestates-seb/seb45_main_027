import React from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const button = "bg-white hover:bg-gray-100 py-2 px-4 shadow rounded";

const Edit = () => {
  const { feedId } = useParams(); // useParams를 사용하여 feedId를 가져옴

  const configParams = {
    method: "DELETE",
    url: `/feed/${feedId}`, // 파라미터를 API 엔드포인트에 추가
  };
  const [res, err, loading, fetchData] = useAxios(configParams);

  // 삭제 버튼 클릭 시 서버 통신 로직 실행
  const handleDeleteClick = async () => {
    try {
      // useAxios 훅을 사용하여 DELETE 요청 보내기
      await fetchData();

      // 요청 후 처리할 로직 추가
      if (!err) {
        alert("삭제 요청이 성공했습니다.");
        // 다른 로직 수행 가능
      } else {
        alert("삭제 요청 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("삭제 요청 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <div className="flex justify-end w-full mt-5">
      <button className={button}>
        <span className="text-xl">수정하기</span>
      </button>
      <button className={`${button} ml-4`} onClick={handleDeleteClick}>
        <span className="text-xl">삭제하기</span>
      </button>
    </div>
  );
};

export default Edit;
