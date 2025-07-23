import { useState, useRef, useEffect } from "react";
import OpenCamera from "./OpenCamera";
import CameraIcon from "./icons/CameraIcon";
import LoadFaceModels from "./LoadFaceModels";
import * as faceapi from "face-api.js";

const FACE_DETECTIONS_PER_SECOND = 1;

export default function TakeFacePicture({ onPictureCaptured }) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detectedFaceDescriptor, setDetectedFaceDescriptor] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const faceDetectionCanvasRef = useRef(null);
  const faceApiIntervalRef = useRef();

  const handleOnOpenCamera = (videoElement) => {
    setIsCameraActive(true);
    videoRef.current = videoElement;
  };

  const handleOnModelsLoaded = () => {
    setModelsLoaded(true);
  };

  const takePicture = () => {
    if (!videoRef.current) {
      console.error("Video element not found");
      return;
    }
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL("image/jpeg", 0.8);

    setCapturedImage(base64Image);
    clearInterval(faceApiIntervalRef.current);
    onPictureCaptured && onPictureCaptured(base64Image);
  };

  const scanFace = async () => {
    const videoWidth = videoRef.current.width || 640;
    const videoHeight = videoRef.current.height || 360;

    faceapi.matchDimensions(faceDetectionCanvasRef.current, videoRef.current);
    const faceApiInterval = setInterval(async () => {
      if (
        capturedImage ||
        !videoRef.current ||
        !faceDetectionCanvasRef.current ||
        !modelsLoaded
      ) {
        return;
      }

      const detections = await faceapi
        .detectAllFaces(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, {
        width: videoWidth,
        height: videoHeight,
      });
      const bestDetection =
        resizedDetections && resizedDetections.length > 0
          ? resizedDetections[0]
          : null;
      setDetectedFaceDescriptor(bestDetection);

      faceDetectionCanvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(
        faceDetectionCanvasRef.current,
        bestDetection ? [bestDetection] : [] //Draw only the best detection
        //resizedDetections //Draw all detections
      );
      // faceapi.draw.drawFaceLandmarks(
      //   faceDetectionCanvasRef.current,
      //   resizedDetections
      // );
    }, 1000 / FACE_DETECTIONS_PER_SECOND);
    faceApiIntervalRef.current = faceApiInterval;
  };

  // Cleanup interval when component unmounts
  useEffect(() => {
    return () => {
      if (faceApiIntervalRef.current) {
        clearInterval(faceApiIntervalRef.current);
        faceApiIntervalRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      {/* Note: Removing this from the DOM after capturing was causing problem. So, using the display property fixed it. */}
      <div
        style={{
          position: "relative",
          display: !capturedImage ? "block" : "none",
        }}
      >
        <OpenCamera onOpenCamera={handleOnOpenCamera} onPlay={scanFace} />
        {isCameraActive && (
          <canvas
            ref={faceDetectionCanvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        )}
      </div>
      <LoadFaceModels onModelsLoaded={handleOnModelsLoaded} />
      {!capturedImage && isCameraActive && (
        <p>
          {detectedFaceDescriptor === null && <h4 style={{ color: "red", fontSize: "0.8rem" }}>
            No face was detected yet.
          </h4>}
          <button
            type="button"
            style={detectedFaceDescriptor === null ? {
              cursor: "not-allowed",
            } : {
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              marginBottom: "1rem",
            }}
            onClick={takePicture}
            disabled={detectedFaceDescriptor === null}
          >
            <CameraIcon />
            &nbsp; Take Picture
          </button>
        </p>
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
              // transform: "scaleX(-1)",
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
