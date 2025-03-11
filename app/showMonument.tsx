import { Monument } from "@/src/Monument";
import {useEffect, useState} from "react";
import {getMonument} from "@/src/arqivApiClient";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {useLocalSearchParams} from "expo-router";
import MonumentModel from "@/app/components/ShowModel";

export default function MonumentDetailsScreen() {
    const { monumentKey } = useLocalSearchParams() as {monumentKey: string};

    const [monument, setMonument] = useState<Monument | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMonumentDetails = async () => {
            try {
                const monument = await getMonument(monumentKey);
                setMonument(monument);
            } catch (error) {
                console.error("Error fetching monument details:", error);
            } finally {
                setLoading(false);
            }
        };

        getMonumentDetails();
    }, [monumentKey]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (monument) {
        return (
            <View style={{ padding: 16 }}>
                <ThemedText style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
                    {monument.name}
                </ThemedText>

                {/* Render the 3D model */}
                <MonumentModel modelUrl={monument.modelPath} />

                <ThemedText style={{ fontSize: 18, color: "gray", marginTop: 16 }}>
                    {monument.location}
                </ThemedText>
                <ThemedText style={{ marginTop: 8 }}>{monument.description}</ThemedText>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
    location: { fontSize: 16, color: "#666", marginBottom: 8, textAlign: "center" },
    description: { fontSize: 14, color: "#444", textAlign: "center" },
});