import { useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export default function LoadFaceModels({ onModelsLoaded }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const modelsLoadedFromStorage = sessionStorage.getItem('faceModelsLoaded');
        if (modelsLoadedFromStorage === 'true') {
          console.log('Face models already loaded from previous session');
          setError(null);
          setLoading(false);
          onModelsLoaded();
          return;
        }

        console.log('Loading face models...');
        const uri = "/models";
        await faceapi.nets.ssdMobilenetv1.loadFromUri(uri);
        await faceapi.nets.faceLandmark68Net.loadFromUri(uri);
        await faceapi.nets.faceRecognitionNet.loadFromUri(uri);

        sessionStorage.setItem('faceModelsLoaded', 'true');
        setError(null);
        setLoading(false);
        onModelsLoaded();
      } catch (error) {
        console.error("Error loading models:", error);
        setError("Failed to load face models.");
        setLoading(false);
        sessionStorage.removeItem('faceModelsLoaded');
      }
    };

    loadModels();
  }, [onModelsLoaded]);

  return (
    <div className="load-models-container">
      {loading && <p>Loading face models...</p>}
      {error && <p>{error}</p>}
      {/* {!loading && <p>Face models loaded successfully!</p>} */}
    </div>
  );
}
