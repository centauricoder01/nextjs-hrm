"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";

const Camera = ({ takeImage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCameraWindow, setShowCameraWindow] = useState(false);
  const [showCanvasWindow, setShowCanvasWindow] = useState(false);

  const startCamera = async () => {
    setShowCameraWindow(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
  };

  const captureImage = async () => {
    if (videoRef.current && canvasRef.current) {
      setShowCanvasWindow(true);
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
      }
      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        setShowCameraWindow(false);
      }

      // Convert the canvas image to data URL
      const imageDataUrl = canvasRef.current.toDataURL("image/png");

      // Convert data URL to blob
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();

      // Create a FormData object
      const formData = new FormData();
      formData.set("file", blob);

      takeImage(formData);

      // Send the image to the backend
      axios
        .post("/api/employees", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      <button onClick={startCamera} className="border p-2 bg-green-400 m-2">
        Start Camera
      </button>
      <button onClick={captureImage} className="border p-2 bg-green-400 m-2">
        Capture Image
      </button>
      <div className="flex justify-center items-center border">
        {showCameraWindow ? (
          <video ref={videoRef} autoPlay={true} width="450" height="350" />
        ) : null}
        <canvas ref={canvasRef} width="450" height="350" />
      </div>
    </div>
  );
};

export default Camera;
