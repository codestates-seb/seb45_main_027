import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (configParams) => {
  // axios.defaults.baseURL = "http://ec2-43-201-113-34.ap-northeast-2.compute.amazonaws.com:8080";
  const [res, setRes] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDataUsingAxios(configParams);
  }, []);

  const fetchDataUsingAxios = async () => {
    setLoading(true);
    try {
      const response = await axios.request(configParams);
      setRes(response);
    } catch (error) {
      setErr(error);
    } finally {
      setLoading(false);
    }
  };

  return [res, err, loading];
};

export default useAxios;
