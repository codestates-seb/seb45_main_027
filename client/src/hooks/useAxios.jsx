import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (configParams) => {
  // axios.defaults.baseURL = "https://1416-210-123-100-75.ngrok-free.app";
  const [res, setRes] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(configParams);
  }, []);

  const fetchData = async () => {
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

  return [res, err, loading, fetchData];
};

export default useAxios;
