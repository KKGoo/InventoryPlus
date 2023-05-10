import React, { useEffect, useState } from 'react';
import AuthService from '../service/AuthService';

const authService = AuthService();

function UserPage() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await authService.getUser();
      if (response) {
        setEmail(response.email);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>User Page</h1>
      <p>Email: {email}</p>
    </div>
  );
}

export default UserPage;