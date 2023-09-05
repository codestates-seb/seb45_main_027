import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); //유저정보 여기에 담을거임
  const navigate = useNavigate();

  useEffect(() => {
    // 엑세스토큰 체크하고 리프레시토큰 받아오는 부분
    async function checkAuthStatus() {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");
       

      // 로컬스토리지안에 저장되어 있는 엑세스 토큰이 있을때만 아래코드 실행
      if (storedAccessToken) {

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storedAccessToken}`;
        // 엑세스토큰을 매 요청시 헤더에 싣는부분(상의 필요함--토큰이 필요 없는 요청에서는 어떻게 되는지)
        
        try {
          // 가지고 있는 엑세스토큰이 유효한지 확인
          await axios.get("/api/auth/check-auth");
        } catch (error) {
          if (
            error.response &&
            error.response.status === 401 &&
            storedRefreshToken
          ) {
            // 엑세스토큰이 만료되었고 리프레시토큰만 있을때, 가지고 있는 리프레시 토큰으로 다시 엑세스토큰 받아옴(상의 필요)
            try {
              const refreshResponse = await axios.post(
                "/api/auth/refresh-token",
                {
                  refreshToken: storedRefreshToken,
                }
              );

              // 새로 받은 엑세스토큰을 Axios 헤더에 기본값으로 넣고, 로컬스토리지에도 저장함
              const newAccessToken = refreshResponse.data.accessToken;
              localStorage.setItem("accessToken", newAccessToken);
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
            } catch (refreshError) {
              // 리프레시 토큰 사용 실패했을때
              console.error("Token refresh failed:", refreshError);
              navigate('/login')
            }
          } else {
            // 또 다른 오류들이나 리프레시토큰이 만료됐을때
            console.error("Authentication error:", error);
            navigate('/login')
          }
        }
      }
    }

    checkAuthStatus();
  }, []);

  async function login(email, password) {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      setUser(response.data.user);  // user로 오는지 member로 오는지 확인 필요

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      navigate('/showroom')
    } catch (error) {
      console.error("Login failed:", error);
      alert('Login failed');
      throw error;
    }
  }

  async function register(nickname, email, password) {
    try {
      const response = await axios.post("/api/auth/register", {
        nickname,
        email,
        password,
      });
      setUser(response.data.user); // user로 오는지 member로 오는지 확인 필요

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      navigate('/login')
    } catch (error) {
      console.error("Registration failed:", error);
      alert('Signup failed');
      throw error;
    }
  }

  function logout() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  }

  const value = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
