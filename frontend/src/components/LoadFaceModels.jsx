import { useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export default function LoadFaceModels({ onModelsLoaded }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        if(window.modelsLoaded){
          setLoading(false);
          onModelsLoaded();
          return;
        }
        
        const uri = "/models";
        await faceapi.nets.ssdMobilenetv1.loadFromUri(uri);
        await faceapi.nets.faceLandmark68Net.loadFromUri(uri);
        await faceapi.nets.faceRecognitionNet.loadFromUri(uri);

        sessionStorage.setItem('faceModelsLoaded', 'true');
        setError(null);
        setLoading(false);
        window.modelsLoaded = true; // Set global flag to indicate models are loaded
        onModelsLoaded();
      } catch (error) {
        console.error("Error loading models:", error);
        setError("Failed to load face models.");
        setLoading(false);
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
