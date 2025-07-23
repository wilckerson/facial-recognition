import React from 'react';
import OpenCamera from '../components/OpenCamera';
function FaceLogin() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
      <h2>Face Login</h2>
      <OpenCamera />
    </div>
  );
}

export default FaceLogin;
