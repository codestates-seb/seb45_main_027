import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const ViewForm = ({ content, loading, error }) => {
  
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
