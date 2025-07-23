import React, { useState, useRef, useEffect } from 'react';
import './FaceCamera.css';

function FaceCamera() {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef();
  const streamRef = useRef();

  const handleOpenCamera = async () => {
    setIsLoading(true);
    setError('');
    setVideoReady(false);

    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser');
      }

      // Request camera access with fallback constraints
      let stream;
      try {
        // Try with ideal constraints first
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          },
          audio: false 
        });
      } catch (err) {
        // Fallback to basic video constraints
        console.warn('Falling back to basic video constraints:', err);
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: false 
        });
      }

      // Store stream reference for cleanup
      streamRef.current = stream;
      videoRef.current.srcObject = stream;

      setIsActive(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      
      // Handle different types of errors
      if (err.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera permissions and try again.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device.');
      } else if (err.name === 'NotSupportedError') {
        setError('Camera is not supported in this browser.');
      } else {
        setError('Unable to access camera. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopCamera = () => {
    if (streamRef.current) {
      // Stop all tracks
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsActive(false);
    setVideoReady(false);
    setError('');
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

//   if (isActive) {
//     return (
//       <div className="camera-container">
//         {/* {!videoReady && (
//           <div className="video-loading">
//             <div className="loading-spinner"></div>
//             <p>Loading video...</p>
//           </div>
//         )} */}
//         <video
//           ref={videoRef}
//           className={`camera-video`}
//           autoPlay
//           playsInline
//           muted
//           controls={false}
//         />
//         <button 
//           type="button" 
//           className="stop-camera-button"
//           onClick={handleStopCamera}
//         >
//           Stop Camera
//         </button> 
//       </div>
//     );
//   }

  return (
    <div className="camera-wrapper">
      {error && (
        <div className="camera-error">
          {error}
        </div>
      )}
      {        !isActive && (
      <button 
        type="button" 
        className={`camera-button ${isLoading ? 'loading' : ''}`}
        onClick={handleOpenCamera}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="loading-spinner"></div>
            Accessing Camera...
          </>
        ) : (
          <>
            <svg 
              className="camera-icon" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <circle 
                cx="12" 
                cy="13" 
                r="4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            Open Camera
          </>
        )}
      </button>)}
       <video
          ref={videoRef}
          className={`camera-video`}
          autoPlay
          playsInline
          muted
          controls={false}
          style={{ display: isActive ? 'block' : 'none' }}
        />
    </div>
  );
}

export default FaceCamera;
