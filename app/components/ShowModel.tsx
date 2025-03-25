import React, {Suspense, useRef} from "react";
import {Canvas, useLoader} from "@react-three/fiber";
import {ActivityIndicator, View} from "react-native";
import {BACKEND_BASE_URL} from "@/src/constants";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Environment, PerspectiveCamera, useGLTF} from "@react-three/drei";
import Model from "@/app/components/Model";
import {GLView} from "expo-gl";
import {Scene} from "three";
import Renderer from "three/src/renderers/common/Renderer";

type MonumentModelProps = {
    modelUrl: string;
};

const MonumentModel: React.FC<MonumentModelProps> = ({ modelUrl }) => {

    // function Model({ modelUrl }: MonumentModelProps) {
    //     const groupRef = useRef();
    //     const fullUrl = `${BACKEND_BASE_URL}${modelUrl}`;
    //     console.log(fullUrl);
    //     // const gltf = useLoader(GLTFLoader, fullUrl);
    //     // return <primitive object={gltf.scene} />
    //     const { nodes, materials } = useGLTF(fullUrl);
    //     return (
    //         <group ref={groupRef} dispose={null}>
    //             <mesh material={materials.main} />
    //         </group>
    //     );
    // }

    const onContextCreate = async () => {
        return (
        <Canvas camera={{ position: [-6, 0, 16], fov: 36 }}
                onCreated={(state) =>
                { const _gl = state.gl.getContext()
                    const pixelStorei = _gl.pixelStorei.bind(_gl)
                    _gl.pixelStorei = function(...args) {
                        const [parameter] = args
                        switch(parameter) { case _gl.UNPACK_FLIP_Y_WEBGL: return pixelStorei(...args) } } }}>
            <ambientLight intensity={2} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            {/*<Environment preset="city" />*/}
            <Suspense fallback={"...loading"}>
                <Model modelUrl={modelUrl}></Model>
                {/*<Model></Model>*/}
            </Suspense>
            {/*<OrbitControls />*/}
        </Canvas>
        );
    }

    return (
        <View style={{ width: "100%", height: 300 }}>
            {/*<GLView onContextCreate={onContextCreate}></GLView>*/}
            <Canvas camera={{ position: [-6, 0, 16], fov: 36 }}
                    onCreated={(state) =>
                    { const _gl = state.gl.getContext()
                        const pixelStorei = _gl.pixelStorei.bind(_gl)
                        _gl.pixelStorei = function(...args) {
                            const [parameter] = args
                            switch(parameter) { case _gl.UNPACK_FLIP_Y_WEBGL: return pixelStorei(...args) } } }}>
                <ambientLight intensity={2} />
                <directionalLight position={[5, 5, 5]} intensity={2} />
                {/*<Environment preset="city" />*/}
                <Suspense fallback={"...loading"}>
                    <Model modelUrl={modelUrl}></Model>
                    {/*<Model></Model>*/}
                </Suspense>
                {/*<OrbitControls />*/}
            </Canvas>
        </View>
    );
};

export default MonumentModel;
