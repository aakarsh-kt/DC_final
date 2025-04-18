"use client";
import React, { useState } from "react";
import { useGLTF, useCursor } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { useRouter } from "next/navigation";

export function Model(props) {
  const { nodes, materials } = useGLTF("/assets/model.glb");

  const states = [
    { geo: nodes.Object_4.geometry, mat: materials.material },
    { geo: nodes.Object_6.geometry, mat: materials.Punjab },
    { geo: nodes.Object_8.geometry, mat: materials.Maharashtra },
    { geo: nodes.Object_10.geometry, mat: materials.Himachal_pradesh },
    { geo: nodes.Object_12.geometry, mat: materials.Haryana },
    { geo: nodes.Object_14.geometry, mat: materials.Uttarakhand },
    { geo: nodes.Object_16.geometry, mat: materials.Delhi },
    { geo: nodes.Object_18.geometry, mat: materials.material_7 },
    { geo: nodes.Object_20.geometry, mat: materials.Rajasthan },
    { geo: nodes.Object_22.geometry, mat: materials.Gujrat },
    { geo: nodes.Object_24.geometry, mat: materials.Chattisgarh },
    { geo: nodes.Object_26.geometry, mat: materials.material_11 },
    { geo: nodes.Object_28.geometry, mat: materials.Bihar },
    { geo: nodes.Object_30.geometry, mat: materials.Jharkhand },
    { geo: nodes.Object_32.geometry, mat: materials.Odisha },
    { geo: nodes.Object_34.geometry, mat: materials.West_Bengal },
    { geo: nodes.Object_36.geometry, mat: materials.Sikkim },
    { geo: nodes.Object_38.geometry, mat: materials.Telangana },
    { geo: nodes.Object_40.geometry, mat: materials.material_18 },
    { geo: nodes.Object_42.geometry, mat: materials.Andhra_Pradesh },
    { geo: nodes.Object_44.geometry, mat: materials.Karnataka },
    { geo: nodes.Object_46.geometry, mat: materials.Kerla },
    { geo: nodes.Object_48.geometry, mat: materials.Tamil_Nadu },
    { geo: nodes.Object_50.geometry, mat: materials.Assam },
    { geo: nodes.Object_52.geometry, mat: materials.Arunachal_Pradesh },
    { geo: nodes.Object_54.geometry, mat: materials.Meghalaya },
    { geo: nodes.Object_56.geometry, mat: materials.Nagaland },
    { geo: nodes.Object_58.geometry, mat: materials.Manipur },
    { geo: nodes.Object_60.geometry, mat: materials.Mizoram },
    { geo: nodes.Object_62.geometry, mat: materials.Tripura },
  ];

  return (
    <group {...props} dispose={null}>
      {states.map(({ geo, mat }, i) => (
        <State key={i} geometry={geo} material={mat} />
      ))}
    </group>
  );
}

function State({ geometry, material }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const router = useRouter();
  useCursor(hovered);

  const { position, scale } = useSpring({
    position: hovered ? [0.5, 0, 0] : [0, 0, 0],
    scale: active ? [1.2, 1.2, 1.2] : [1, 1, 1],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  // ✅ Material name → State route key mapping
  const nameMap = {
    material_7: "uttar-pradesh",
    material_11: "madhya-pradesh",
    material_18: "goa",
    material: "jammu-and-kashmir",
    Himachal_pradesh: "himachal-pradesh",
    Kerla: "kerala",
    West_Bengal: "west-bengal",
    Andhra_Pradesh: "andhra-pradesh",
    Tamil_Nadu: "tamil-nadu",
    Arunachal_Pradesh: "arunachal-pradesh",
    Uttarakhand: "uttarakhand",
    Maharashtra: "maharashtra",
    Karnataka: "karnataka",
    Telangana: "telangana",
    Odisha: "odisha",
    Jharkhand: "jharkhand",
    Chattisgarh: "chhattisgarh",
    Gujrat: "gujarat",
    Sikkim: "sikkim",
    Punjab: "punjab",
    Haryana: "haryana",
    Delhi: "delhi",
    Rajasthan: "rajasthan",
    Bihar: "bihar",
    Assam: "assam",
    Meghalaya: "meghalaya",
    Nagaland: "nagaland",
    Manipur: "manipur",
    Mizoram: "mizoram",
    Tripura: "tripura",

  };

  return (
    <a.mesh
      geometry={geometry}
      material={material}
      position={position}
      scale={scale}
      castShadow
      receiveShadow
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setActive((a) => !a);
        const rawName = material.name;
        const stateName = nameMap[rawName] || rawName.toLowerCase().replace(/\s+/g, "-");
        console.log("Routing to:", stateName);
        router.push(`/states/${stateName}`);
      }}
    />
  );
}

useGLTF.preload("/assets/model.glb");
