import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const TitleText = "flex items-center justify-center text-4xl font-bold";

const ViewTitle = ({ title, loading, error }) => {
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