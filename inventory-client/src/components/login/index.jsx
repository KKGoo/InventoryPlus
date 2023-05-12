import React, { useState, useEffect } from "react";
import AuthService from "../../service/AuthService";
import { useNavigate } from 'react-router-dom';
import "../../styles/login.css";

const authService = AuthService();

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const emailRegex = /^\S+@\S+\.\S+$/;

  async function logged() {
    const response = await authService.logged();
    console.log(response)
    if(response === true){
      navigate('/home');
    }
    else {
      console.log(false)
    }
  }

  useEffect(() => {
    logged();
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }
    const response = await authService.login(email, password);
    setError(response);

    console.log(response)
    logged();

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
                onChange={handleEmailChange}
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
