import React, {useEffect, useState} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthService from "../../service/AuthService";

const authService = AuthService();

const PrivateRoute = () => {
  const [auth, setAuth] = useState(true)
  useEffect(() => {
    async function logged() {
      const response = await authService.logged();
      if(response){
        setAuth(response)
        console.log(response)
      }
    }
    logged();
  }, []);

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute