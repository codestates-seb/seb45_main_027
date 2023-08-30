import React from "react";
import { Link } from "react-router-dom";
import Background from "../components/common/Background";

const Tips = () => {
  return (
    <Background mainclassName="" divclassName="">
      <Link to="/tips/write">
        <button>글쓰기</button>
      </Link>
    </Background>
  );
};

export default Tips;
