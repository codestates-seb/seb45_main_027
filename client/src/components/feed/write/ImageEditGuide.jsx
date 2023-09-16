import React from "react";

const ImageEditGuide = () => {
  const uploadimgsrc =
    "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/gallery.png";
  const guideimgsrc =
    "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/book.png";

  return (
    <div>
      <h2 className="flex my-2 text-2xl font-semibold">
        <img src={guideimgsrc} className="w-[24px]" />
        <span className="px-3">이미지 편집 Guide</span>
      </h2>
      <ol className="text-md p-3">
        <li className="py-1">
          <div className="flex items-center">
            1. 　<img src={uploadimgsrc} alt="imageupload" />
            　버튼을 눌러 업로드 하고 싶은 이미지를 선택하세요.
          </div>
        </li>
        <li className="py-2">
          2. 사진이 업로드 된 후 원하는 위치에 클릭 후 태그를 추가합니다.
        </li>
        <li className="py-2">
          3. 인테리어와 관련된 태그를 입력 하신뒤 Enter 혹은 Add Tag 버튼을
          누르세요.
        </li>
        <li className="py-2">
          4. 추가한 태그를 삭제 하고 싶은 경우, 해당 태그에 마우스를 Hover 후 X
          버튼을 누르세요.
        </li>
        <li className="py-2">
          5. 작업이 완료되었으면, (이미지 등록) 버튼을 클릭하여, 본문에 사진을
          추가합니다.
        </li>
        <li className="py-2">
          　* 본문에 첨부한 이미지(태그포함)을 삭제 하고 싶은 경우 (이미지 삭제)
          버튼을 누르세요.
        </li>
      </ol>
    </div>
  );
};

export default ImageEditGuide;
