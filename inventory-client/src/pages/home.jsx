import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";

// styling
import "../styles/home.css"; // Importamos el archivo CSS para Home

// components
import EnterpriseForm from "../components/enterprise/EnterpriseForm";
import EnterpriseList from "../components/enterprise/EnterpriseList";

// services
import AuthService from "../service/AuthService";

const authService = AuthService();

const Container = () => {
  const [welcome, setWelcome] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    authService.user().then((data) => {
      setCurrentUser(data);
    });
    console.log(currentUser);
  }, []);

  const setBannerClass = () => {
    const classArr = ["banner-side cfb"];
    if (welcome) classArr.push("send-right");
    return classArr.join(" ");
  };

  const setFormClass = () => {
    const classArr = ["form-side cfb"];
    if (welcome) classArr.push("send-left");
    return classArr.join(" ");
  };

  return (
    <>
      <Header title="InventoryPlus" />
      <div className="App cfb">
        <div className="Container cfb">
          <div className={setBannerClass()}>
            {welcome ? <h2>Create Company</h2> : <h2>Companies</h2>}
            {currentUser?.role === 0 && (
              <button onClick={() => setWelcome(!welcome)}>
                {welcome ? "Companies" : "Create Company"}
              </button>
            )}
          </div>

          <div className={setFormClass()}>
            {welcome ? (
              <EnterpriseForm user={currentUser} />
            ) : (
              <EnterpriseList user={currentUser} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
