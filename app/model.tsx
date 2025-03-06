import {StyleSheet, View} from 'react-native';
import ShowModel from "@/app/ShowModel";
import {BACKEND_BASE_URL} from "@/src/constants";
import {OrbitControls, useGLTF} from "@react-three/drei";
import React, {Suspense} from "react";
import {Canvas} from "@react-three/fiber";

const MODEL_URL = `${BACKEND_BASE_URL}/Hand.glb`;

function HandModel() {
    const { scene } = useGLTF(MODEL_URL);
    return <primitive object={scene} scale={0.5} />;
}

export default function ModelScreen() {
    // This component visualizes the 3D model
    // Todo: The url of the model needs to be passed to the component somehow
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
