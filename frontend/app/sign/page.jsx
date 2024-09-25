"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import Webcam from "react-webcam";
import ProgressBar from "./ProgressBar/ProgressBar";
import { SignImageData } from "./SignImageData";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";



let startTime = new Date();

const Detect = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [gestureOutput, setGestureOutput] = useState("");
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [runningMode, setRunningMode] = useState("IMAGE");
  const [progress, setProgress] = useState(0);

  const requestRef = useRef();

  const [detectedData, setDetectedData] = useState([]);

  const { userId, user } = useAuth();

  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    let intervalId;

    if (webcamRunning) {
      intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * SignImageData.length);
        const randomImage = SignImageData[randomIndex];
        setCurrentImage(randomImage);
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [webcamRunning]);

  const predictWebcam = useCallback(() => {
    if (runningMode === "IMAGE") {
      setRunningMode("VIDEO");
      gestureRecognizer?.setOptions({ runningMode: "VIDEO" });
    }

    const nowInMs = Date.now();
    const results = gestureRecognizer?.recognizeForVideo(
      webcamRef.current?.video,
      nowInMs
    );

    const canvasCtx = canvasRef.current?.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const videoWidth = webcamRef.current?.video.videoWidth;
    const videoHeight = webcamRef.current?.video.videoHeight;

    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    if (results?.landmarks) {
      for (const landmarks of results.landmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 5,
        });

        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
      }
    }
    if (results?.gestures.length > 0) {
      setDetectedData((prevData) => [
        ...prevData,
        {
          SignDetected: results.gestures[0][0].categoryName,
        },
      ]);

      setGestureOutput(results.gestures[0][0].categoryName);
      setProgress(Math.round(parseFloat(results.gestures[0][0].score) * 100));
    } else {
      setGestureOutput("");
      setProgress(0);
    }

    if (webcamRunning) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  }, [webcamRunning, runningMode, gestureRecognizer]);

  const animate = useCallback(() => {
    requestRef.current = requestAnimationFrame(animate);
    predictWebcam();
  }, [predictWebcam]);

  const enableCam = useCallback(() => {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    if (webcamRunning) {
      setWebcamRunning(false);
      cancelAnimationFrame(requestRef.current);
      setCurrentImage(null);

      const endTime = new Date();

      const timeElapsed = (
        (endTime.getTime() - startTime.getTime()) /
        1000
      ).toFixed(2);

      const nonEmptyData = detectedData.filter(
        (data) => data.SignDetected !== "" && data.DetectedScore !== ""
      );

      const resultArray = [];
      let current = nonEmptyData[0];

      for (let i = 1; i < nonEmptyData.length; i++) {
        if (nonEmptyData[i].SignDetected !== current.SignDetected) {
          resultArray.push(current);
          current = nonEmptyData[i];
        }
      }

      resultArray.push(current);

      const countMap = new Map();

      for (const item of resultArray) {
        const count = countMap.get(item.SignDetected) || 0;
        countMap.set(item.SignDetected, count + 1);
      }

      const sortedArray = Array.from(countMap.entries()).sort(
        (a, b) => b[1] - a[1]
      );

      const outputArray = sortedArray
        .slice(0, 5)
        .map(([sign, count]) => ({ SignDetected: sign, count }));

      const data = {
        signsPerformed: outputArray,
        id: uuidv4(),
        username: user?.fullname,
        userId: userId,
        createdAt: String(endTime),
        secondsSpent: Number(timeElapsed),
      };

      setDetectedData([]);
    } else {
      setWebcamRunning(true);
      startTime = new Date();
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [
    webcamRunning,
    animate,
    detectedData,
    user?.fullname,
    userId,
  ]);


// Function to sync canvas size with the webcam video dimensions
const syncCanvasSize = () => {
  if (webcamRef.current && canvasRef.current) {
    const video = webcamRef.current.video;
    if (video) {
      const width = video.videoWidth;
      const height = video.videoHeight;
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;
    }
  }
};

useEffect(() => {
  syncCanvasSize(); // Sync on initial render
}, []);

  useEffect(() => {
    async function loadGestureRecognizer() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );
      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            process.env.NEXT_PUBLIC_FIREBASE_STORAGE_TRAINED_MODEL,
        },
        numHands: 2,
        runningMode: runningMode,
      });
      setGestureRecognizer(recognizer);
    }
    loadGestureRecognizer();
  }, [runningMode]);

  return (
    <div className="flex flex-col  min-h-screen">
      <h1 className="text-3xl text-center lg:text-5xl font-bold text-green-500 mb-10">
        Learn Sign Language
      </h1>
  
      <div className="flex flex-col lg:flex-row justify-evenly items-center w-full max-w-screen-2xl">
        {userId ? (
          <>
            <div className="relative flex flex-col items-center mt-6">
              <Webcam
                audio={false}
                ref={webcamRef}
                style={{ marginLeft: "-150px" }}
                className="w-[700px] h-[500px] lg:w-[900px] lg:h-[700px] "
                onLoadedData={syncCanvasSize}
              />
  
              <canvas
                ref={canvasRef}
                
                className="border-2 border-green-500 rounded-lg shadow-lg absolute left-0 top-0 w-[600px] h-[400px] lg:w-[800px] lg:h-[600px] "
                style={{ marginLeft: "-150px" }}
              />
  
              <div className="flex flex-col items-center text-center mt-8">
                <div className="flex flex-row gap-10">
                  <Button
                    onClick={enableCam}
                    variant={webcamRunning ? "danger" : "primary"}
                    className="w-[160px] h-[50px] text-[24px] font-medium"
                    style={{ marginLeft: "-150px", marginTop: "-20px" }}
                  >
                    {webcamRunning ? "Stop" : "Start"}
                  </Button>

                  <Button
                    variant="secondary"
                    className="w-[160px] h-[50px] text-[24px] font-medium"
                    style={{ marginTop: "-20px" }}
                  >
                    <Link href="/courses">
                        Back
                    </Link>
                  </Button>
                </div>
  
                <div className="flex items-center mt-8">
                  <p className="text-[24px] text-gray-700 mr-10">
                    {gestureOutput}
                  </p>

                  {progress > 0 && (
                    <div className="flex-1" style={{ marginLeft: "-350px" }}>
                      <ProgressBar progress={progress} />
                      
                    </div>
                  )}
                </div>

              </div>
            </div>
  
            <div className="flex flex-col items-center " style={{  marginTop: "-80px" }}>
              <h2 className="text-3xl uppercase text-green-600 text-center tracking-[5px] mb-8">
                Image
              </h2>
  
              <div className="flex flex-col items-center justify-center w-[400px] h-[300px] lg:w-[350px] lg:h-[250px] mb-32 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200">
                {currentImage ? (
                  <Image
                  src={currentImage.url}
                  alt={`img ${currentImage.id}`}
                  width={300}  
                  height={200} 
                  className="rounded-lg"
                />
                ) : (
                  <h3 className="text-center mb-32 text-2xl">
                    Click on the Start Button <br /> to practice with Images
                  </h3>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center p-8">
            <h1 className="text-3xl lg:text-4xl tracking-[5px] font-extrabold">
              Please Login!
            </h1>
            <img
              className="w-[700px] h-[500px] object-contain my-4 rounded-lg"
              src="/path/to/displayImg.gif"
              alt="Display"
            />
            <p className="text-white text-lg lg:text-xl w-3/4 tracking-[2px] font-bold">
              We save your detection data to show your progress and learning in
              the dashboard. Please login to test this detection feature.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
  
export default Detect;
