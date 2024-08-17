"use client";
import Image from "next/image";
import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface ImageCaptureProps {
  setImage: (url: string) => void;
}

const ImageCapture: React.FC<ImageCaptureProps> = ({ setImage }) => {
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const capture = useCallback(() => {
    const image = webcamRef.current?.getScreenshot();
    if (image) {
      setImageSrc(image);
    } else {
      console.error("Failed to capture image");
    }
  }, [webcamRef]);

  const handleSubmit = async () => {
    if (!imageSrc) {
      console.error("No image captured to upload");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/save-image", {
      method: "POST",
      body: JSON.stringify({ image: imageSrc }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    if (result.success) {
      console.log("Image saved at: ", result.filePath);
      setImage(result.filePath); // send the path of the image
      setLoading(false); // stop the loading spinner
      setIsOpen(false); // Close the popup
    } else {
      console.log("Failed to save image", result);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="border p-2 font-bold bg-blue-500 text-white rounded-sm w-full"
      >
        Share Image
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md shadow-md relative flex justify-center items-center gap-5">
            <div className=" text-center mt-7">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="mb-4 w-[50rem]"
              />
              <button
                onClick={capture}
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 mb-4"
              >
                Capture
              </button>
            </div>
            {imageSrc && (
              <div className="flex flex-col items-center mt-3">
                <Image
                  src={imageSrc}
                  alt="Captured"
                  width={200}
                  height={150}
                  className="mb-4 w-[50rem]"
                />
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                >
                  {loading ? <LoadingSpinner /> : "Upload"}{" "}
                </button>
              </div>
            )}
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="absolute top-2 right-2 text-black text-lg hover:text-gray-700 font-extrabold "
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCapture;
