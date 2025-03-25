import React, {useRef} from "react";
import {BACKEND_BASE_URL} from "@/src/constants";
import {useGLTF} from "@react-three/drei";
import {Mesh, MeshStandardMaterial, Object3D, TextureLoader} from "three";
import {useLoader} from "@react-three/fiber";

type MonumentModelProps = {
    modelUrl: string;
};

export default function Model({ modelUrl }: MonumentModelProps) {
    // const group = useRef();
    // const fullUrl = `${BACKEND_BASE_URL}${modelUrl}`;
    const fullUrl = `${BACKEND_BASE_URL}/Duck.glb`;
    console.log(fullUrl);
    // const gltf = useLoader(GLTFLoader, fullUrl);
    const gltf = useGLTF(fullUrl);
    console.log("gltf: ", gltf);
    // console.log("gltf scene:", gltf.scene);
    // console.log("materials:", gltf.materials);
    gltf.scene.traverse((child: Object3D) => {
        if (child instanceof Mesh) {
            if (child.material instanceof MeshStandardMaterial) {
                // if (child.material.map) {
                //     child.material.map.name = "";
                //     child.material.map.userData = {
                //         mimeType: "image/png",
                //     }
                // }
                console.log("texture:", child.material.map);
                const texture = new TextureLoader().load(`${BACKEND_BASE_URL}/Image_0.png`);
                // texture.colorSpace = "srgb";
                // texture.flipY = false;
                // texture.userData = {
                //     mimeType: "image/png",
                // };
                child.material.map = texture;
                console.log("texture:", child.material.map);
                // child.material.color.set(0xFF0000);
                child.material.flatShading = false;
                child.material.needsUpdate = true;
            }
        }
    });
    return <primitive object={gltf.scene} scale={2}/>
}

// export default function Model() {
//     const { nodes, materials } = useGLTF(`${BACKEND_BASE_URL}/OmaniCupBlender.glb`);
//     console.log("nodes:", nodes);
//     console.log(materials.main);
//     return (
//         <group dispose={null}>
//             {/*<mesh castShadow receiveShadow geometry={nodes.mesh.geometries} material={materials.main} />*/}
//             {/*<mesh castShadow receiveShadow material={materials.main} />*/}
//             <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.mesh.geometries}
//                 material={materials['main.003']}
//             />
//         </group>
//     )
// }

useGLTF.preload(`${BACKEND_BASE_URL}/OmaniCupBlender.glb`);
