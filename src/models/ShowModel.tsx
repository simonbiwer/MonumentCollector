import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { View } from 'react-native';
import {BACKEND_BASE_URL} from "@/src/constants";


const MODEL_URL = `${BACKEND_BASE_URL}/Hand.glb`;

function HandModel() {
    const { scene } = useGLTF(MODEL_URL);
    return <primitive object={scene} scale={0.5} />;
}

export default function ShowModel() {
    return (
        <View style={{ flex: 1 }}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <Suspense fallback={null}>
                    <HandModel />
                </Suspense>
                <OrbitControls /> {/* Allows rotating the model */}
            </Canvas>
        </View>
    );
}
