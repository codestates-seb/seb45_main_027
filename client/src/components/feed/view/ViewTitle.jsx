import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";

const TitleText = "flex items-center justify-center text-4xl font-bold";

const ViewTitle = () => {
  const { tipId } = useParams();
  const [title, setTitle] = useState(null);
  console.log(title);

  const configParams = {
    method: "GET",
    url: `/tip/${tipId}`,
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  };

  const [response, error, loading] = useAxios(configParams);

  useEffect(() => {
    if (response) {
      setTitle(response.data.title);
    } else if (error) {
      console.error("Error:", error);
    }
  }, [response, error]);

  useEffect(() => {
    if (!title && loading) {
      toast.loading("로딩중...");
    } else if (title || error) {
      toast.dismiss();
    }
  }, [title, loading, error]);

  return (
    <div className="max-h-full">
      {title ? <span className={TitleText}>{title}</span> : null}
    </div>
  );
};

export default ViewTitle;