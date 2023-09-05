import React, { useEffect, useState } from "react";
import axios from "axios";

const TitleText = "flex items-center justify-center text-4xl font-bold";

const ViewTitle = () => {
  const [title, setTitle] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/feed/{parameter}`)
      .then((res) => {
        setTitle(res.data.title);
      })
      .catch((err) => {
        console.log("Error msg:", err);
      });
  }, []);

  return (
    <div className="max-h-full">
      {title ? (
        <span className={TitleText}>{title}</span>
      ) : (
        <div className={TitleText}>
          <span>Title. Title. Title. Title.</span>
        </div>
      )}
    </div>
  );
};

export default ViewTitle;