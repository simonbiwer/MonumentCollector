import { Monument } from "@/src/Monument";
import {useEffect, useState} from "react";
import {getMonument} from "@/src/arqivApiClient";
import {ActivityIndicator, StyleSheet, ScrollView, View} from "react-native";
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
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <ThemedText style={styles.title}>
                        {monument.name}
                    </ThemedText>

                    {/* Render the 3D model */}
                    <MonumentModel modelUrl={monument.modelPath} />

                    <ThemedText style={styles.location}>
                        {monument.location}
                    </ThemedText>
                    <ThemedText style={styles.description}>
                        {monument.description}
                    </ThemedText>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    location: {
        fontSize: 18,
        color: "gray",
        marginTop: 16,
    },
    description: {
        marginTop: 8,
    },
});