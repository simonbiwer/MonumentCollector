import React from "react";
import {BACKEND_BASE_URL} from "@/src/constants";
import {useGLTF} from "@react-three/drei";

type MonumentModelProps = {
    modelUrl: string;
};

export default function Model({ modelUrl }: MonumentModelProps) {
    const fullUrl = `${BACKEND_BASE_URL}${modelUrl}`;
    const gltf = useGLTF(fullUrl);
    return <primitive object={gltf.scene} scale={2}/>
}