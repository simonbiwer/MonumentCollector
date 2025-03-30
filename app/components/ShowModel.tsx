import React from "react";
import {View, Image} from "react-native";
import {BACKEND_BASE_URL} from "@/src/constants";

type MonumentModelProps = {
    modelUrl: string;
};

const MonumentModel: React.FC<MonumentModelProps> = ({ modelUrl }) => {
    return (
        <View style={{ width: "100%", height: 300 }}>
            <Image
                source={{ uri: `${BACKEND_BASE_URL}${modelUrl}` }}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            />
        </View>
    );
};

export default MonumentModel;
