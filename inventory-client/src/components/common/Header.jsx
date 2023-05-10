import React from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/header.css';
import AuthService from '../../service/AuthService';

const AuthServices = AuthService();

function Header(props) {
  const navigate = useNavigate();

  const handleLogOut = () => {
    console.log('logout');
    AuthServices.logout();
    navigate('/');
  };

  return (
    <div className="header">
      <h1>{props.title}</h1>
      <div className="links">
        <Link to="/user" className="user-icon">
          <FiUser />
        </Link>
        <div className="logout">
          <FiLogOut onClick={handleLogOut} />
        </div>
      </div>
    </div>
  );
}

export default Header;