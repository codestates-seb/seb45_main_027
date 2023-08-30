import React from "react";
import { Link } from "react-router-dom";

const ShowRoom = () => {
  return (
    <div>
      <Link to="/showroom/write">
        <button>글쓰기</button>
      </Link>
    </div>
  );
};

export default ShowRoom;
