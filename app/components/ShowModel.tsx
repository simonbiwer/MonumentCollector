import React, {Suspense} from "react";
import {useLoader} from "@react-three/fiber";
import {ActivityIndicator} from "react-native";
import {BACKEND_BASE_URL} from "@/src/constants";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

type MonumentModelProps = {
    modelUrl: string;
};

const MonumentModel: React.FC<MonumentModelProps> = ({ modelUrl }) => {

    function Model({ modelUrl }: MonumentModelProps) {
        const fullUrl = `${BACKEND_BASE_URL}${modelUrl}`;
        console.log(fullUrl);
        const gltf = useLoader(GLTFLoader, fullUrl);
        return <primitive object={gltf.scene} />
    }

    return (
        <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
            <Model modelUrl={modelUrl}></Model>
        </Suspense>
    );

    // return (
    //     <View style={{ width: "100%", height: 300 }}>
    //         <Canvas camera={{ position: [0, 1, 3] }}>
    //             <ambientLight intensity={1} />
    //             <directionalLight position={[2, 5, 2]} intensity={1.5} />
    //             <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
    //                 <Model modelUrl={modelUrl}></Model>
    //             </Suspense>
    //             <OrbitControls />
    //         </Canvas>
    //     </View>
    // );
};

export default MonumentModel;
