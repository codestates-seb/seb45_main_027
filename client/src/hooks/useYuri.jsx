import { useState, useEffect } from "react";

const useYuri = (configObj) => {
  const { axiosInstance, url, method, requestConfig = {} } = configObj;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });

        console.log("res", res);
        setResponse(res.data);
      } catch (err) {
        console.log("err", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return [response, error, Loading];
};

export default useYuri;
