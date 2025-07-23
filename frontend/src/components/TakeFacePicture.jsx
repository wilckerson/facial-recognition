import { useState, useRef } from "react";
import OpenCamera from "./OpenCamera";
import CameraIcon from "./icons/CameraIcon";

export default function TakeFacePicture({onPictureCaptured}) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleOnOpenCamera = (videoElement) => {
    setIsCameraActive(true);
    videoRef.current = videoElement;
  };

  const takePicture = () => {
    if (!videoRef.current) {
      console.error("Video element not found");
      return;
    }

    // Create canvas element if it doesn't exist
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to base64 image
    const base64Image = canvas.toDataURL("image/jpeg", 0.8);

    setCapturedImage(base64Image);
    onPictureCaptured && onPictureCaptured(base64Image);
  };

  return (
    <div>
      <div style={{ display: !capturedImage ? 'block' : 'none' }}>

      <OpenCamera onOpenCamera={handleOnOpenCamera} />
      </div>
      {!capturedImage && isCameraActive && (<p>
        <button
          type="button"
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
          onClick={takePicture}
        >
          <CameraIcon />
          &nbsp; Take Picture
        </button></p>
      )}

      {capturedImage && (
        <div>
          <img
            src={capturedImage}
            alt="Captured face"
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              border: "2px solid #28a745",
              borderRadius: "8px",
              transform: "scaleX(-1)",
            }}
          />
          <div
            style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: "#666" }}
          >
            <button
              type="button"
              style={{
                backgroundColor: "#6c757d",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "3px",
                border: "none",
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
              onClick={() => setCapturedImage(null)}
            >
              Retake Picture
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
