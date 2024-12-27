import React from 'react';
import { useAuth } from '../../AuthContext';

const Home = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
