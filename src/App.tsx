import { useEffect } from "react";
import * as faceapi from "face-api.js";
import "./App.css";

console.time("loading-model");
await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
console.timeEnd("loading-model");

function App() {
  useEffect(() => {
    async function init() {
      //await faceapi.nets.tinyFaceDetector.loadFromUri("/models");

      const input = document.getElementById("myImg")!;
      const displaySize = {
        width: input.clientWidth,
        height: input.clientHeight,
      };

      const canvas = document.getElementById("overlay");
      faceapi.matchDimensions(canvas as any, displaySize);

      console.time("detecting-faces");
      const detections = await faceapi.detectAllFaces(
        input as any
        //new faceapi.TinyFaceDetectorOptions()
      );
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      faceapi.draw.drawDetections(canvas as any, resizedDetections);
      console.timeEnd("detecting-faces");
      console.log("Faces detected:", detections.length);
    }
    init();
  }, []);

  return (
    <>
      <h1>Face Recognition</h1>
      <div style={{ position: "relative" }}>
        {/* <img id="myImg" src="/images/family2.jpg" width="500" height="333" /> */}
        <img
          id="myImg"
          src="/images/rosto-oculos.webp"
          width="500"
          height="333"
        />
        <canvas
          id="overlay"
          style={{ top: 0, left: 0, position: "absolute" }}
        ></canvas>
      </div>
    </>
  );
}

export default App;
