import React, { useState, useEffect } from "react";
import AuthService from "../../service/AuthService";
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css";

const authService = AuthService();

const LogIn = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function logged() {
      const response = await authService.logged();
      if(response){
        navigate('/home');
      }
    }
    logged();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response= await authService.login(email, password);
    if(response == 200){
      navigate('/home');
      console.log(response)
    }
  };

  return (
    <div className="Login">
      <div className="Login__container">
        <form className="Form__container" onSubmit={handleLogin}>
          <h1 className="Form__header">LogIn</h1>
          {error && <p className="Form__error">{error}</p>}
          <div>
            <div className="Form__input-container">
              <p className="Form__input-label">email</p>
              <input
                className="Form__input"
                type="text"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="Form__input-container">
              <p className="Form__input-label">Password</p>
              <input
                className="Form__input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="Form__buttons">
            <button className="Form__button" type="submit">
              Sign in
            </button>
          </div>
        </form>
        <div className="backgrounds">
          <h1>
            Hello <br /> welcome <br /> back!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
