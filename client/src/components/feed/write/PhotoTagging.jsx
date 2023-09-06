import React, { useState } from "react";
import styled from "styled-components";
import Tag from "./Tag";

const StylePhotoTagging = styled.div`
  display: inline-block;
  position: relative; // 요소를 자기 기준으로 배치
  margin-left: 100px;
`;

const StyledImage = styled.img`
  max-width: 100%;
  cursor: crosshair;

  border-radius: 10px;
`;

const InputContainer = styled.div`
  position: absolute; // 부모(조상) 요소를 기준으로 배치
  // 부모를 기준으로 x축으로 x만큼 y축으로 y만큼 이동시키기
  left: ${(props) => props.x};
  top: ${(props) => props.y};
`;

const Input = styled.input`
  padding: 4px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 4px 8px;
  background-color: #00647b;
  border-radius: 5px;
  color: white;
  border: none;
  cursor: pointer;
`;

const CloseInputButton = styled.button`
  padding: 4px 8px;
  background-color: #00647b;
  border-radius: 5px;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 5px;
`;

const PhotoTagging = ({
  imageSrc,
  setCurrentTag,
  currentTag,
  tags,
  setTags,
}) => {
  const [photoHovered, setPhotoHovered] = useState(false); // 사진에 hover했는지의 여부
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 }); // 태그 추가시 input값의 x,y 축값을 정하기 위함
  const [inputVisible, setInputVisible] = useState(false);
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect(); // 뷰포트에서 해당 element의 위치값
    const x = ((e.clientX - rect.left) / rect.width) * 100 + "%"; // element 내에서 클릭한곳의 좌표를 구하기 위함x 좌표를 백분율로 계산
    const y = ((e.clientY - rect.top) / rect.height) * 100 + "%"; // y 좌표를 백분율로 계산

    setInputPosition({ x, y }); // x, y 좌표값을 props을 통해 css속성값(left, top)으로 전달
    setCurrentTag({ x, y, text: "" }); // x, y 좌표값과 태그의 내용을 설정
    setInputVisible(true); // 이미지 클릭시 인풋박스가 보이도록 설정
  };

  const handleTagInput = (e) => {
    // 인풋값 내용 변경시 태그의 본문을 update
    setCurrentTag({ ...currentTag, text: e.target.value });
  };

  const handleTagSubmit = () => {
    if (currentTag.text) {
      setTags([...tags, currentTag]); // tags 배열에 현재 추가한 currentTag 추가하기, 한 그림에 tags가 여러개들어감
      setCurrentTag({ x: 0, y: 0, text: "" }); // 태그 초기화
      setInputVisible(false); // add tag 버튼 누르고나면 인풋박스 안보이게 설정
    }
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleTagSubmit();
    }
  };

  const handleTagDelete = (tagText) => {
    const updatedTags = tags.filter((tag) => tag.text !== tagText);
    setTags(updatedTags);
  };

  const handleCloseInput = () => {
    setInputVisible(false);
  };

  return (
    <StylePhotoTagging
      onMouseEnter={() => setPhotoHovered(true)}
      onMouseLeave={() => setPhotoHovered(false)}
    >
      <StyledImage src={imageSrc} alt="Taggable" onClick={handleImageClick} />
      {tags.map((tag, index) => (
        <Tag
          key={index}
          x={tag.x}
          y={tag.y}
          text={tag.text}
          handleTagDelete={handleTagDelete}
          photoHovered={photoHovered}
        />
      ))}
      {photoHovered &&
        inputVisible && ( //사진에 호버, inputVisible이 true일때만 태그인풋 박스 렌더링
          <InputContainer x={inputPosition.x} y={inputPosition.y}>
            <Input
              autoFocus
              type="text"
              value={currentTag.text}
              onChange={handleTagInput}
              placeholder="Enter tag"
              onKeyDown={handleEnterKey} //엔터클릭시 handleTagSubmit 동작
            />
            <Button onClick={handleTagSubmit}>Add Tag</Button>
            <CloseInputButton onClick={handleCloseInput}>
              Close
            </CloseInputButton>
          </InputContainer>
        )}
    </StylePhotoTagging>
  );
};

export default PhotoTagging;
