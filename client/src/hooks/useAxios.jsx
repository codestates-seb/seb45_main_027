import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (url, method, parameter = null, config = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
          try {
            const res = await axios({
              url: parameter
                ? `${url}/${parameter}`
                : url,
              method,
              ...config,
            });
            setData(res.data);
          } catch (err) {
            setError(err.message);
          } finally {   
            setLoading(false);
          }
        };

        fetchData();

  }, [url, method, parameter, JSON.stringify(config)]);

  return { data, error, loading };
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
// import { useEffect, useState } from "react";
// import axios from "axios";

// const useAxios = (configParams) => {
//   axios.defaults.baseURL = "https://4ef7-210-123-100-75.ngrok-free.app/";
//   const [res, setRes] = useState("");
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDataUsingAxios(configParams);
//   }, []);

//   const fetchDataUsingAxios = async () => {
//     try {
//       const response = await axios.request(configParams);
//       setRes(response);
//     } catch (error) {
//       setErr(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return [res, err, loading];
// };

// export default useAxios;