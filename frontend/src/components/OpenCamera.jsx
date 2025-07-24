import React, { useState, useRef, useEffect } from "react";
import CameraIcon from "./icons/CameraIcon";
import "./OpenCamera.css";

function FaceCamera({ onOpenCamera, onPlay }) {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef();
  const streamRef = useRef();
  const videoWidth = 640; 
  const videoHeight = 360;

  const handleOpenCamera = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported in this browser");
      }

      // Request camera access with fallback constraints
      let stream;
      try {
        // Try with ideal constraints first
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: videoWidth },
            height: { ideal: videoHeight },
            facingMode: "user",
          },
          audio: false,
        });
      } catch (err) {
        // Fallback to basic video constraints
        console.warn("Falling back to basic video constraints:", err);
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      // Store stream reference for cleanup
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      onOpenCamera && onOpenCamera(videoRef.current);

      setIsActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);

      // Handle different types of errors
      if (err.name === "NotAllowedError") {
        setError(
          "Camera access denied. Please allow camera permissions and try again."
        );
      } else if (err.name === "NotFoundError") {
        setError("No camera found on this device.");
      } else if (err.name === "NotSupportedError") {
        setError("Camera is not supported in this browser.");
      } else {
        setError("Unable to access camera. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnPlay = () => {
    onPlay && onPlay(videoRef.current);
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="camera-wrapper">
      {error && <div className="camera-error">{error}</div>}
      {!isActive && (
        <button
          type="button"
          className={`camera-button ${isLoading ? "loading" : ""}`}
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
              <CameraIcon />
              Open Camera
            </>
          )}
        </button>
      )}
      <video
        ref={videoRef}
        className={`camera-video`}
        autoPlay
        playsInline
        muted
        controls={false}
        style={{ display: isActive ? "block" : "none" }}
        onPlay={handleOnPlay}
        width={videoWidth}
        height={videoHeight}
      />
    </div>
  );
}

export default FaceCamera;
