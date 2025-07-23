import { useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export default function LoadFaceModels({ onModelsLoaded }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const uri = "/models";
        await faceapi.nets.ssdMobilenetv1.loadFromUri(uri);
        await faceapi.nets.faceLandmark68Net.loadFromUri(uri);
        await faceapi.nets.faceRecognitionNet.loadFromUri(uri);

        setError(null);
        setLoading(false);
        onModelsLoaded();
      } catch (error) {
        console.error("Error loading models:", error);
        setError("Failed to load face models.");
      }
    };

    loadModels();
  }, []);

  return (
    <div className="load-models-container">
      {loading && <p>Loading face models...</p>}
      {error && <p>{error}</p>}
      {/* {!loading && <p>Face models loaded successfully!</p>} */}
    </div>
  );
}
