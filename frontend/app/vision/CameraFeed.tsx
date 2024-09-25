import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

type CameraFeedProps = {
  onFrameCaptured: (imageBlob: Blob) => void;
};

const CameraFeed: React.FC<CameraFeedProps> = ({ onFrameCaptured }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCaptureClick = () => {
    setIsCapturing((prev) => !prev); // Toggle capturing state
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoElement) {
            videoElement.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing the camera", error);
        });
    }
  }, []);

  useEffect(() => {
    const captureFrame = () => {
      const videoElement = videoRef.current;
      const canvasElement = canvasRef.current;

      if (videoElement && canvasElement) {
        const context = canvasElement.getContext("2d");
        context?.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        // Convert canvas to a blob
        canvasElement.toBlob((blob) => {
          if (blob) {
            onFrameCaptured(blob); // Send the blob to parent component
          }
        }, "image/png");
      }
    };

    let interval: NodeJS.Timeout | undefined;
    if (isCapturing) {
      interval = setInterval(captureFrame, 1000); // Capture frame every second while capturing is on
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCapturing, onFrameCaptured]);

  return (
    <div className="camera-feed flex flex-col items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full h-auto max-w-4xl rounded-lg shadow-lg border-2 border-gray-300 mb-4"
      />
      <canvas
        ref={canvasRef}
        className="hidden"
        width={640}
        height={480}
      ></canvas>
      <Button
        onClick={handleCaptureClick}
        className="mt-4"
        variant={isCapturing ? "danger" : "primary"}
        size="lg"
      >
        {isCapturing ? "Stop Capturing" : "Start Capturing"}
      </Button>
    </div>
  );
};

export default CameraFeed;
