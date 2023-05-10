import React, { useEffect, useState } from 'react';
import AuthService from '../service/AuthService';

const authService = AuthService();

function UserPage() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    authService.user().then((response) => {
        setEmail(response.email)
      });
    }, []);

  return (
    <div>
      <h1>User Page</h1>
      <p>Email: {email}</p>
    </div>
  );
}

export default UserPage;