"use client";

import { useState } from "react";
import CameraFeed from "./CameraFeed";
import ObjectDetection from "./ObjectDetection";
import GPTResponse from "./GPTResponse";

const VisionPal = () => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [detectedObjects, setDetectedObjects] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  const handleFrameCaptured = (blob: Blob) => {
    setImageBlob(blob); // Captures image blob
  };

  const handleObjectsDetected = (objects: string[]) => {
    setDetectedObjects(objects); // Updates detected objects
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value); // Updates selected language
  };

  return (
    <div className="vision-pal-container">
      <h1 className="text-3xl text-center lg:text-5xl font-bold text-green-500 mb-10">
        Vision Pal
      </h1>
      <div className="flex flex-col items-center">
        {/* Dropdown for language selection */}
        <div className="mb-4">
          <label htmlFor="language" className="text-lg font-semibold mr-2">
            Select Language:
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="p-2 border rounded-md"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="pt">Portuguese</option>
          </select>
        </div>

        <CameraFeed onFrameCaptured={handleFrameCaptured} />
        {imageBlob && (
          <ObjectDetection imageBlob={imageBlob} onObjectsDetected={handleObjectsDetected} />
        )}
        <GPTResponse detectedObjects={detectedObjects} selectedLanguage={selectedLanguage} />
      </div>
    </div>
  );
};

export default VisionPal;