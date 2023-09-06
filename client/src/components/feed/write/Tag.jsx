import React, { useState } from "react";
import styled from "styled-components";

const StyleTag = styled.div`
  position: absolute;
  left: ${(props) => props.x};
  top: ${(props) => props.y};
  background-color: #f5634a;
  padding: 4px;
  border-radius: ${(props) => (!props.hovered ? "50%" : "4px")};
  min-width: 22px;
  min-height: 15px;
  color: white;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.hovered ? 1 : 0.85)};
  visibility: ${(props) => (props.photoHovered ? "visible" : "hidden")};
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 12px;
  cursor: pointer;
  margin-left: 5px;
`;

const Tag = ({ x, y, text, handleTagDelete, photoHovered }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <StyleTag
      x={x}
      y={y}
      hovered={hovered}
      photoHovered={photoHovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {photoHovered && (
        <>
          {hovered ? text : "+"}
          {hovered && (
            <CloseButton onClick={() => handleTagDelete(text)}>X</CloseButton>
          )}
        </>
      )}
    </StyleTag>
  );
};

export default Tag;
