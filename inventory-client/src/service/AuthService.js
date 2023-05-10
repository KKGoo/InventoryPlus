import React from "react";

const AuthService = () => {
  const login = async (email, password) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.status) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logged = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/islogged`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      return response.status === 200;
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  const user = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.status) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (email, password) => {
    try {
      const response = await fetch("/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    login,
    logout,
    register,
    logged,
    user,
  };
};

export default AuthService;
