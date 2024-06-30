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
          withCredentials: true
        });
        setIsAuthenticated(response.data.status === "ok");
        console.log(response.data.status === "ok")
      } catch (error) {
        console.error("Authentication verification failed:", error);
        setIsAuthenticated(false);
      }
    };

    verifyAuth();
  }, []);

  const refreshAuth = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}user-refresh-token`, {
        withCredentials: true
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
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
