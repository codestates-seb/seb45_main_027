import React from "react";

const ImageEditGuide = () => {
  const uploadimgsrc =
    "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/gallery.png";
  const guideimgsrc =
    "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/book.png";
  
  const pointStyle =
    "font-semibold bg-[#F5634A] bg-opacity-40 text-gray-700 px-2 py-1 rounded mx-1 underline";

  return (
    <div>
      <h2 className="flex my-2 text-2xl font-semibold">
        {/* <img src={guideimgsrc} className="w-[24px]" /> */}
        <span className="px-3"> ⭐ 이미지 편집 가이드 ⭐</span>
      </h2>
      <ol className="text-md p-3 text-lg font-medium">
        <li className="py-1">
          1.<span className={pointStyle}>이미지 등록하기</span>버튼을 Click!
        </li>
        <li className="py-2">2. 알려주고 싶은 사진을 Click!</li>
        <li className="py-2">
          3. 사진이 정상적으로 올라 갔다면? 사진 원하는 위치를 Click!
        </li>
        <li className="py-2">
          4. 입력창에 관련 태그를 입력하신 후
          <span className={pointStyle}>Enter</span>
          또는 <span className={pointStyle}>Add Tag</span> 버튼을 Click!
        </li>
        <li className="py-2">
          　* 추가한 태그를 삭제 하고 싶은 경우, 원하는 태그에 마우스를 올린 후
          <span className={pointStyle}> X </span> 버튼 Click!
        </li>
        <li className="py-2">
          5. 원하는 정보 입력이 마무리가 되었다면, 하단에
          <span className={pointStyle}>이미지 등록</span> 버튼을 Click!
        </li>
        <li className="py-2">
          　* 본문에 첨부한 이미지(태그 포함)을 삭제 하고 싶은 경우에는 상단에
          <span className={pointStyle}>이미지 삭제</span>버튼을 Click!
        </li>
      </ol>
    </div>
  );
};

export default ImageEditGuide;
