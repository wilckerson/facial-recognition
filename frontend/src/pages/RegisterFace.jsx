import React, { useState } from 'react';
import TakeFacePicture from '../components/TakeFacePicture';
import './RegisterFace.css';

function RegisterFace() {
  const [fullName, setFullName] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const [detectedFaceDescriptor, setDetectedFaceDescriptor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    if (!fullName.trim() || !detectedFaceDescriptor) {
      setMessage('Please provide a full name and capture a face picture.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Convert face descriptor to JSON string
      const faceDescriptorJSON = JSON.stringify(Array.from(detectedFaceDescriptor.descriptor));

      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FullName: fullName.trim(),
          FaceDescriptorJSON: faceDescriptorJSON
        })
      });

      if (response.ok) {
        setMessage('User registered successfully!');
        
        // Reset form after successful registration
        setFullName('');
        setCapturedImage(null);
        setDetectedFaceDescriptor(null);
      } else {
        const errorData = await response.json();
        setMessage(`Registration failed: ${errorData.message || 'Unknown error'}`);
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      setMessage('Network error. Please check if the server is running.');
      console.error('Network error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  function handleOnPictureCaptured(imageBase64, faceDescriptor) {
    setCapturedImage(imageBase64);
    setDetectedFaceDescriptor(faceDescriptor);
    setMessage(''); // Clear any previous messages
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

        {message && (
          <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <button
          type="button"
          className="save-button"
          onClick={handleSave}
          disabled={!fullName.trim() || !capturedImage || isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default RegisterFace;
