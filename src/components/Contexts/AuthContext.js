/* eslint-disable use-isnan */
import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
const baseURL = "http://localhost:3001/";
//const baseURL = "https://sale-bid.df.r.appspot.com/";

const AuthContext = createContext();
/*export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const userToken = localStorage.getItem("token");
      if (userToken) {
        try {
          const response = await axios.get(`${baseURL}user-token`, {
            headers: { Authorization: `Bearer ${userToken}` },
          });
          console.log(response)
          setToken(response.data.token);
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
        }
      }
    };

    verifyToken();
  }, []);

  const fetchNewToken = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}user-refresh-token`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error("Failed to refresh token", error);
    }
  }, []);

  useEffect(() => {
    console.log(token);
    if (!token) return;

    const tokenExpirationTime = 60 * 60 * 1000; // 1 hour
    const tokenRefreshTime = tokenExpirationTime - 15 * 60 * 1000; // 45 minutes

    const intervalId = setInterval(fetchNewToken, tokenRefreshTime);

    return () => clearInterval(intervalId);
  }, [token, fetchNewToken]);

  return (
    <AuthContext.Provider value={{ token, setToken, fetchNewToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);*/

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get(`${baseURL}user-token`, {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.status === "ok");
        console.log(response.data.status === "ok");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Token expired, attempting to refresh...");
          refreshAuth();
        } else {
          console.error("Authentication verification failed:", error);
          setIsAuthenticated(false);
        }
      }
    };
    // console.log(majorityElement([3, 2, 3]));
    verifyAuth();
  }, []);

  /*const ilends = (ilends) => {
    let num = 0;
    for (let i = 0; i < ilends.length; i++) {
      for (let j = 0; j < ilends[0].length; j++) {
        if (ilends[i][j] === "1")
          if (j === 0) {
            if (i === 0) num++;
            else if (ilends[i - 1][j] === "0") num++;
          } else if (i === 0) {
            if (ilends[i][j - 1] === "0") num++;
          } else if (ilends[i][j - 1] === "0" && ilends[i - 1][j] === "0")
            num++;
      }
    }
    return num;
  };
  useEffect(
    () =>
      console.log(
        ilends([
          ["1","1","0","0","0"],
          ["1","1","0","0","0"],
          ["0","0","1","0","0"],
          ["0","0","0","1","1"]
        ])
      ),
    []
  );*/

  const logout = useCallback(async () => {
    try {
      await axios.post(`${baseURL}logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsAuthenticated(false);
      window.location.href = "/";
    }
  }, []);

  const refreshAuth = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}user-refresh-token`, {
        withCredentials: true,
      });
      setIsAuthenticated(response.data.status === "ok");
    } catch (error) {
      console.error("Failed to refresh authentication", error);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const authRefreshTime = 45 * 60 * 1000; // 45 minutes

    const intervalId = setInterval(refreshAuth, authRefreshTime);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, refreshAuth]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, refreshAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
