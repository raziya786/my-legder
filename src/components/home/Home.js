import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <p>Home Page</p>
      {user &&  <>
        <p>Welcome, {user.name}!</p>
      </>}
      
    </div>
  );
};

export default Home;