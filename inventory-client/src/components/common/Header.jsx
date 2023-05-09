import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import '../../styles/header.css'

function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
      <div className="logout">
        <FiLogOut />
      </div>
    </div>
  );
}

export default Header;