import React, { useState } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="home-container">
        <h2>Home</h2>
        <p>Welcome to Facial Recognition App.</p>
    </div>
  );
}

export default Home;
