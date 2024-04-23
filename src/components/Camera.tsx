"use client"
import axios from 'axios';
import React, { useState } from 'react'
import { useRef } from 'react';

const Camera = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showCameraWindow, setShowCameraWindow] = useState(true)

    const startCamera = async () => {
        setShowCameraWindow(true)
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        }
    };

    const captureImage = async () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, 640, 480);
            }
            if (videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                setShowCameraWindow(false)
            }

            // Convert the canvas image to data URL
            const imageDataUrl = canvasRef.current.toDataURL('image/png');

            // Convert data URL to blob
            const response = await fetch(imageDataUrl);
            const blob = await response.blob();

            // Create a FormData object
            const formData = new FormData();
            formData.append('image', blob, 'image.png');

            // Send the image to the backend
            // axios.post('/api/upload', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // });

        }
    };
    return (
        <div>
            {
                showCameraWindow ? <video ref={videoRef} autoPlay={true} width="640" height="480" /> : null
            }

            <button onClick={startCamera}>Start Camera</button>
            <button onClick={captureImage}>Capture Image</button>
            <canvas ref={canvasRef} width="640" height="480" />
        </div>
    )
}

export default Camera