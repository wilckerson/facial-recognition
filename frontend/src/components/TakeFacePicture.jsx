import { useState } from "react";
import OpenCamera from "./OpenCamera";
import CameraIcon from "./icons/CameraIcon";

export default function TakeFacePicture() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const handleOnOpenCamera = (videoElement) => {
    setIsCameraActive(true);
  };

  return (
    <div>
      <label>Face picture</label>
      <p>Click the button below to take a picture of your face.</p>
      <OpenCamera onOpenCamera={handleOnOpenCamera} />
      <br/>
      {isCameraActive && (
        <button type="button" style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px 20px', borderRadius: '5px', border: 'none' }}>
          <CameraIcon />
          &nbsp;
          Take Picture
        </button>
      )}
    </div>
  );
}
