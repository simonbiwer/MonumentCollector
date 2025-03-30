import React, {Suspense} from "react";
import {Canvas} from "@react-three/fiber";
import {View} from "react-native";
import Model from "@/app/components/Model";

type MonumentModelProps = {
    modelUrl: string;
};

const MonumentModel: React.FC<MonumentModelProps> = ({ modelUrl }) => {
    return (
        <View style={{ width: "100%", height: 300 }}>
            <Canvas camera={{ position: [-6, 0, 16], fov: 36 }}
                    onCreated={(state) =>
                    { const _gl = state.gl.getContext()
                        const pixelStorei = _gl.pixelStorei.bind(_gl)
                        _gl.pixelStorei = function(...args) {
                            const [parameter] = args
                            switch(parameter) { case _gl.UNPACK_FLIP_Y_WEBGL: return pixelStorei(...args) } } }}>
                <ambientLight intensity={2} />
                <directionalLight position={[5, 5, 5]} intensity={2} />
                <Suspense fallback={"...loading"}>
                    <Model modelUrl={modelUrl}></Model>
                </Suspense>
            </Canvas>
        </View>
    );
};

export default MonumentModel;
