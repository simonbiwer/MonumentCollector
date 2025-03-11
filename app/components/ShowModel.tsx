import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { View } from "react-native";
import {BACKEND_BASE_URL} from "@/src/constants";

type MonumentModelProps = {
    modelUrl: string;
};

const MonumentModel: React.FC<MonumentModelProps> = ({ modelUrl }) => {

    const Model = ({ modelUrl }: { modelUrl: string }) => {
        const { scene } = useGLTF(`${BACKEND_BASE_URL}${modelUrl}`);
        return <primitive object={scene} scale={1.5} />;
    };

    return (
        <View style={{ width: "100%", height: 300 }}>
            <Canvas camera={{ position: [0, 1, 3] }}>
                <ambientLight intensity={1} />
                <directionalLight position={[2, 5, 2]} intensity={1.5} />
                <Model modelUrl={modelUrl}></Model>
                <OrbitControls />
            </Canvas>
        </View>
    );
};

export default MonumentModel;
