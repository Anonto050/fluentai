import axios from "axios";
import React, { useEffect, useRef } from "react";

type ObjectDetectionProps = {
  imageBlob: Blob;
  onObjectsDetected: (detectedObjects: string[]) => void;
};

const ObjectDetection: React.FC<ObjectDetectionProps> = ({ imageBlob, onObjectsDetected }) => {
  const lastDetectionTimeRef = useRef<number>(0); // Track the time of the last detection

  const analyzeImage = async () => {
    const now = Date.now();
    const timeSinceLastDetection = now - lastDetectionTimeRef.current;

    // Only allow detection every 5 seconds to prevent rapid updates
    if (timeSinceLastDetection < 5000) {
      console.log("Skipping detection to avoid frequent updates");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", imageBlob, "image.png");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AZURE_ENDPOINT}/vision/v3.2/analyze?visualFeatures=Objects`,
        formData,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_AZURE_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const objects = response.data.objects.map((obj: any) => obj.object);
      onObjectsDetected(objects);

      // Update the last detection time after a successful detection
      lastDetectionTimeRef.current = now;
    } catch (error) {
      console.error("Object detection error:", error);
    }
  };

  useEffect(() => {
    if (imageBlob) {
      analyzeImage();
    }
  }, [imageBlob]);

  return null;
};

export default ObjectDetection;