import { Monument } from "@/src/Monument";
import {useEffect, useState} from "react";
import {getMonument} from "@/src/arqivApiClient";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {useLocalSearchParams} from "expo-router";

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

    return (
        <View style={styles.container}>
            <ThemedText style={styles.title}>{monument?.name}</ThemedText>
            <ThemedText style={styles.location}>{monument?.location}</ThemedText>
            <ThemedText style={styles.description}>{monument?.description}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
    location: { fontSize: 16, color: "#666", marginBottom: 8, textAlign: "center" },
    description: { fontSize: 14, color: "#444", textAlign: "center" },
});