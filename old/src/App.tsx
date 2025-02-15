import { useEffect } from "react";
import * as faceapi from "face-api.js";
import "./App.css";

function App() {
  useEffect(() => {
    async function init() {
      //await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      console.log(faceapi.nets);

      // const input = document.getElementById("myImg")!;
      // const detections = await faceapi.detectAllFaces(
      //   input as any,
      //   new faceapi.SsdMobilenetv1Options()
      // );

      // const canvas = document.getElementById("overlay");
      // faceapi.matchDimensions(canvas as any, {
      //   width: input.clientWidth,
      //   height: input.clientHeight,
      // });

      // // draw detections into the canvas
      // faceapi.draw.drawDetections(canvas as any, detections);

      //   const box = { x: 50, y: 50, width: 100, height: 100 }
      // // see DrawBoxOptions below
      // const drawOptions = {
      //   label: 'Hello I am a box!',
      //   lineWidth: 2
      // }
      // const drawBox = new faceapi.draw.DrawBox(box, drawOptions)
      // drawBox.draw(canvas as any)
    }
    init();
  }, []);

  return (
    <>
      <h1>Face Recognition</h1>
      <div style={{ position: "relative" }}>
        <img id="myImg" src="/images/family1.jpg" width="500" height="333" />
        <canvas
          id="overlay"
          style={{ top: 0, left: 0, position: "absolute" }}
        ></canvas>
      </div>
    </>
  );
}

export default App;
