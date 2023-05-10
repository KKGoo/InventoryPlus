

import React, { useState } from "react";
import Header from "../components/common/Header";

// styling
import "../styles/home.css"; // Importamos el archivo CSS para Home

// components
import EnterpriseForm from "../components/enterprise/EnterpriseForm";
import EnterpriseList from "../components/enterprise/EnterpriseList";

const Container = () => {
  const [welcome, setWelcome] = useState(false);

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
            {welcome ? <h2>Hello, New Friend!</h2> : <h2>Welcome Back</h2>}

            <button onClick={() => setWelcome(!welcome)}>
              {welcome ? "Sign In" : "Create Account"}
            </button>
          </div>

          <div className={setFormClass()}>
            {welcome ? (
              <EnterpriseList />
            ) : (
              <EnterpriseForm />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Container;
