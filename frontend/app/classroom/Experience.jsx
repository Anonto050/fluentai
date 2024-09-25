"use client";

import { useAITeacher } from "@/hooks/useAITeacher";
import {
  CameraControls,
  Environment,
  Float,
  Gltf,
  Html,
  Loader,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva, button, useControls } from "leva";
import { Suspense, useEffect, useRef, useState } from "react";
import { degToRad } from "three/src/math/MathUtils";
import { BoardSettings } from "./BoardSettings";
import { MessagesList } from "./MessagesList";
import { Teacher } from "./Teacher";
import { TypingBox } from "./TypingBox";
import { apiFetch } from "@/lib/apiService";


const itemPlacement = {
  default: {
    classroom: {
      position: [0.2, -1.7, -2],
    },
    teacher: {
      position: [-1, -1.7, -3],
    },
    board: {
      position: [0.45, 0.382, -6],
    },
  },
  alternative: {
    classroom: {
      position: [0.3, -1.7, -1.5],
      rotation: [0, degToRad(-90), 0],
      scale: 0.4,
    },
    teacher: { position: [-1, -1.7, -3] },
    board: { position: [1.4, 0.84, -8] },
  },
};


export const Experience = ({ userId }) => {
  const teacher = useAITeacher((state) => state.teacher);
  const classroom = useAITeacher((state) => state.classroom);
  const setLanguage = useAITeacher((state) => state.setLanguage);
  const [courseName, setCourseName] = useState(""); 
  

  useEffect(() => {
    const fetchCourseName = async () => {
      try {
        // // Fetch the user progress data
        // const userProgress = await apiFetch(`/user-progress/${userId}`);
        
        // // Extract the course name from the activeCourse title
        // const courseName = userProgress.activeCourse?.title || 'Spanish';

        const courseName = 'Spanish'; // Hardcoded for now
        setCourseName(courseName);
        setLanguage(courseName.toLowerCase());

      } catch (error) {
        console.error('Failed to fetch course name:', error);
      }
    };

    fetchCourseName();
  }, []);

  return (
    <>
      <div className="z-10 fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-[600px] flex flex-col space-y-6 bg-gradient-to-tr from-slate-300/30 via-gray-400/30 to-slate-600/30 p-4 backdrop-blur-md rounded-xl border-slate-100/30 border">
        <TypingBox courseName={courseName} /> 
      </div>

      <Leva hidden />
      <Loader />
      <Canvas
        style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}
        camera={{
          position: [0, 0, 0.0001],
        }}
      >
        <CameraManager />

        <Suspense>
          <Float speed={0.5} floatIntensity={0.2} rotationIntensity={0.1}>
            <Html
              transform
              {...itemPlacement[classroom].board}
              distanceFactor={1}
              style={{
                width: '120%',
                height: '120%',
                padding: '20px',
                marginLeft: '20px',
                transform: 'scale(1.5)',
                transformOrigin: 'center',
              }}
            >
              <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
                <MessagesList courseName={courseName} /> {/* Pass courseName as a prop */}
                <BoardSettings />
              </div>
            </Html>

            <Environment preset="sunset" />
            <ambientLight intensity={0.8} color="pink" />

            <Gltf
              src={`/models/classroom_${classroom}.glb`}
              {...itemPlacement[classroom].classroom}
            />
            <Teacher
              teacher={teacher}
              key={teacher}
              {...itemPlacement[classroom].teacher}
              scale={1.5}
              rotation-y={degToRad(20)}
            />
          </Float>
        </Suspense>
      </Canvas>
    </>
  );
};

const CAMERA_POSITIONS = {
  default: [0, 6.123233995736766e-21, 0.0001],
  loading: [
    0.00002621880610890309, 0.00000515037441056466, 0.00009636414192870058,
  ],
  speaking: [0, -1.6481333940859815e-7, 0.00009999846226827279],
};

const CAMERA_ZOOMS = {
  default: 1,
  loading: 1.3,
  speaking: 2.1204819420055387,
};

const CameraManager = () => {
  const controls = useRef();
  const loading = useAITeacher((state) => state.loading);
  const currentMessage = useAITeacher((state) => state.currentMessage);

  useEffect(() => {
    if (loading) {
      controls.current?.setPosition(...CAMERA_POSITIONS.loading, true);
      controls.current?.zoomTo(CAMERA_ZOOMS.loading, true);
    } else if (currentMessage) {
      controls.current?.setPosition(...CAMERA_POSITIONS.speaking, true);
      controls.current?.zoomTo(CAMERA_ZOOMS.speaking, true);
    }
  }, [loading]);

  useControls("Helper", {
    getCameraPosition: button(() => {
      const position = controls.current.getPosition();
      const zoom = controls.current.camera.zoom;
      console.log([...position], zoom);
    }),
  });

  return (
    <CameraControls
      ref={controls}
      minZoom={1}
      maxZoom={3}
      polarRotateSpeed={-0.3} // REVERSE FOR NATURAL EFFECT
      azimuthRotateSpeed={-0.3} // REVERSE FOR NATURAL EFFECT
      mouseButtons={{
        left: 1, //ACTION.ROTATE
        wheel: 16, //ACTION.ZOOM
      }}
      touches={{
        one: 32, //ACTION.TOUCH_ROTATE
        two: 512, //ACTION.TOUCH_ZOOM
      }}
    />
  );
};

useGLTF.preload("/models/classroom_default.glb");
useGLTF.preload("/models/classroom_alternative.glb");
