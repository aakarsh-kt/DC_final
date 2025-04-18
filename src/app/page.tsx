// import IndiaMap from './components/IndiaMap';
"use client"
import { Canvas } from '@react-three/fiber';
import { Model } from './components/Model';
import { OrbitControls } from '@react-three/drei';
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6">
      <h1 className="text-4xl font-bold text-sky-400 text-center">
        Explore Indian States
      </h1>
      <p className="text-gray-300 text-lg mt-2 mb-4 text-center">
        Click on a state to learn about its rich culture and heritage.
      </p>
      {/* <IndiaMap /> */}
      <div className="h-screen w-screen">
      <Canvas
  camera={{ position: [0, 0, 5], fov: 45 }}
>
  <OrbitControls makeDefault enableZoom enablePan />
  <ambientLight intensity={0.5} />
  <directionalLight position={[10, 10, 5]} intensity={1} />
  <pointLight position={[0, 10, 0]} intensity={1} />
  <pointLight position={[-10, -10, -10]} intensity={0.5} />

  {/* rotate around Y by +90° so the map’s flat side faces us */}
  <Model rotation={[0, -Math.PI / 2, 0]} />

</Canvas>

      </div>
    </main>
  );
}
