import React from "react";
import { Link } from "react-router-dom";

const Tips = () => {
  return (
    <div>
      <Link to="/tips/write">
        <button>글쓰기</button>
      </Link>
    </div>
  );
};

export default Tips;
