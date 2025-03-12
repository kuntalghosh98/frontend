








"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";




export function Model1(props) {
  const { nodes, materials } = useGLTF('/nenya_galadriels_ring.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1012.561}>
        <group scale={[0.489, 0.344, 0.501]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane012_0.geometry}
            material={materials.Material}
          />
          <group position={[0.002, -0.005, 1.261]} scale={[0.033, 0.047, 0.032]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Torus002_0.geometry}
              material={materials.gold_white}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Torus002_0_1.geometry}
              material={materials.gold_white}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Torus002_0_2.geometry}
              material={materials.gold_white}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Torus002_0_3.geometry}
              material={materials.gold_white}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Torus002_0_4.geometry}
              material={materials.gold_white}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Torus002_0_5.geometry}
              material={materials.gold_white}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Gem002_0.geometry}
            material={materials['Material.001']}
            position={[0, 0, 1.14]}
            rotation={[0, 0, 0.073]}
            scale={[0.498, 0.706, 0.486]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane015_0.geometry}
          material={materials.Material}
          position={[0, 0, -0.333]}
          scale={[0.127, 0.13, 0.151]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/nenya_galadriels_ring.glb')


export function Model(props) {
  const { nodes, materials } = useGLTF("/one_ring.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials["08___Default"]}
        position={[3.056, 3.056, 0]}
        rotation={[-Math.PI, -Math.PI / 2, 0]}
      />
    </group>
  );
}

useGLTF.preload("/one_ring.glb");

export default function LoadingScreen() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={<p className="absolute text-white">Loading...</p>}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Model scale={1.5} />
          <OrbitControls autoRotate autoRotateSpeed={1.5} />
        </Suspense>
      </Canvas>
      <p className="absolute text-white text-xl font-bold bottom-5">Loading...</p>
    </div>
  );
}
