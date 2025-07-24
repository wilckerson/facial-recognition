import { useState, useRef, useEffect } from "react";
import OpenCamera from "../components/OpenCamera";
import LoadFaceModels from "../components/LoadFaceModels";
import * as faceapi from "face-api.js";

const FACE_DETECTIONS_PER_SECOND = 1;

function FaceLogin() {
  const [faceDescriptors, setFaceDescriptors] = useState([]);
  const [faceData, setFaceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const faceApiIntervalRef = useRef();
  const [userName, setUserName] = useState("");

  const handleOnModelsLoaded = () => {
    setModelsLoaded(true);
  };

  const handleOnOpenCamera = (videoElement) => {
    setIsCameraActive(true);
    videoRef.current = videoElement;
  };

  useEffect(() => {
    const fetchFaceDescriptors = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/users/face-descriptor"
        );

        if (response.ok) {
          const data = await response.json();
          setFaceData(data);

          const labeledFaceDescriptors = [];
          for (const item of data) {
            const arrData = JSON.parse(item.faceDescriptorJSON);
            const descriptor = new faceapi.LabeledFaceDescriptors(
              item.fullName,
              [new Float32Array(arrData)]
            );
            labeledFaceDescriptors.push(descriptor);
          }
          setFaceDescriptors(labeledFaceDescriptors);
          console.log("Face descriptors loaded:", labeledFaceDescriptors);
        } else {
          const errorData = await response.json();
          setError(
            `Failed to load face descriptors: ${
              errorData.message || "Unknown error"
            }`
          );
        }
      } catch (err) {
        setError("Network error. Please check if the server is running.");
        console.error("Error fetching face descriptors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaceDescriptors();
  }, []);

  // Cleanup interval when component unmounts
  useEffect(() => {
    return () => {
      if (faceApiIntervalRef.current) {
        clearInterval(faceApiIntervalRef.current);
        faceApiIntervalRef.current = null;
      }
    };
  }, []);

  const scanFace = async () => {
    console.log("Scanning", videoRef.current);
    setUserName("");
    if (!videoRef.current) {
      return;
    }

    const videoWidth = videoRef.current.width || 640;
    const videoHeight = videoRef.current.height || 360;

    const faceApiInterval = setInterval(async () => {
      console.log("Scanning for faces...");
      if (!videoRef.current || !modelsLoaded) {
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
      // const bestDetection =
      //   resizedDetections && resizedDetections.length > 0
      //     ? resizedDetections[0]
      //     : null;

      const faceMatcher = new faceapi.FaceMatcher(faceDescriptors);

      const results = resizedDetections.map((d) =>
        faceMatcher.findBestMatch(d.descriptor)
      );

      const userName = results?.[0]?.label;
      setUserName(userName);
    }, 1000 / FACE_DETECTIONS_PER_SECOND);
    faceApiIntervalRef.current = faceApiInterval;
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Face Login</h2>

      {loading && (
        <p style={{ color: "#666", fontSize: "0.9rem" }}>
          Loading face descriptors...
        </p>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "0.75rem",
            borderRadius: "6px",
            border: "1px solid #f5c6cb",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {!loading && !error && (
        <p
          style={{ color: "#28a745", fontSize: "0.9rem", marginBottom: "1rem" }}
        >
          {faceDescriptors.length} face descriptor(s) loaded successfully
        </p>
      )}

      <LoadFaceModels onModelsLoaded={handleOnModelsLoaded} />
      <OpenCamera onOpenCamera={handleOnOpenCamera} onPlay={scanFace} />
      {userName && (
        <h1>Hello {userName}</h1>
      )}
    </div>
  );
}

export default FaceLogin;
