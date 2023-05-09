import React from "react";
import "../../styles/login.css"


const LogIn = () => {
  return (
    <div className="Login">
      <div className="Login__container">
        <form className="Form__container" action="">
          <h1 className="Form__header">LogIn</h1>
          <div>
            <div className="Form__input-container">
              <p className="Form__input-label">Username</p>
              <input className="Form__input" type="text" />
            </div>
            <div className="Form__input-container">
              <p className="Form__input-label">Password</p>
              <input className="Form__input" type="text" />
            </div>
 
          </div>
          <div className="Form__buttons">
            <button className="Form__button">Sign in</button>
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
