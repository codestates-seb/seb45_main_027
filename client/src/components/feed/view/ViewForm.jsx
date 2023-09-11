import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";

const ViewForm = () => {
  const { tipId } = useParams();
  const [content, setContent] = useState(null);
  console.log(content);

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
      setContent(response.data.content);
    } else if (error) {
      console.error("Error:", error);
    }
  }, [response, error]);

  useEffect(() => {
    if (!content && loading) {
      toast.loading("로딩중...");
    } else if (content || error) {
      toast.dismiss();
    }
  }, [content, loading, error]);

  return (
    <div className="w-full h-full py-10 border mt-20">
      <span className=" text-5xl">{content}</span>
    </div>
  );
};

export default ViewForm;
