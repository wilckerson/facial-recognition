import React, { useState } from 'react';
import TakeFacePicture from '../components/TakeFacePicture';
import './RegisterFace.css';

function RegisterFace() {
  const [fullName, setFullName] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const [detectedFaceDescriptor, setDetectedFaceDescriptor] = useState(null);

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving user:', fullName, detectedFaceDescriptor);
  };

  function handleOnPictureCaptured(imageBase64, detectedFaceDescriptor) {
    setCapturedImage(imageBase64);
    setDetectedFaceDescriptor(detectedFaceDescriptor);
  }

  return (
    <div className="register-face-container">
      <h2>Register Face</h2>
      <p>Enter your full name to register your face with the system.</p>
      
      <form className="register-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <label>Face Picture</label>
        <TakeFacePicture onPictureCaptured={handleOnPictureCaptured} />

        <button
          type="button"
          className="save-button"
          onClick={handleSave}
          disabled={!fullName.trim() || !capturedImage}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterFace;
