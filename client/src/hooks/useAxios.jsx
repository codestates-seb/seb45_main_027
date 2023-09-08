import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (configParams) => {
  // axios.defaults.baseURL = "https://5402-210-123-100-75.ngrok-free.app";
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

// ---------------------------------------------------------------------------------------

// 유리
// import { useState, useEffect } from "react";
// import axios from "axios";

// const useAxios = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     let isMounted = true; // To prevent setting state on unmounted component

//     const fetchData = async (url, options = {}) => {
//       setLoading(true);

//       try {
//         const response = await axios(url, options);

//         if (isMounted) {
//           setData(response.data);
//           setError(null);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError(err);
//           setData(null);
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     return () => {
//       isMounted = false; // Component unmounted, cancel any ongoing requests
//     };
//   }, []);

//   return { data, error, loading, fetchData: fetchData };
// };

// export default useAxios;

// ---------------------------------------------------------------------------------------

// 원호
