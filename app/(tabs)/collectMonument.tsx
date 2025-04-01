import { ActivityIndicator, Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { collectMonument } from "@/src/CollectionManager";

const Banner = () => (
    <View style={styles.banner}>
        <View style={[styles.stripe, { backgroundColor: '#ffffff' }]} />
        <View style={[styles.stripe, { backgroundColor: '#D62828' }]} />
        <View style={[styles.stripe, { backgroundColor: '#F7B801' }]} />
        <View style={[styles.stripe, { backgroundColor: '#2A9D8F' }]} />
    </View>
);

export default function CollectMonumentScreen() {
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [collected, setCollected] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleCollectMonument = async () => {
        setLoading(true);
        setCollected(false);
        setHasError(false);
        setMessage(null);

        try {
            const result = await collectMonument();
            if (result) {
                setMessage(result);
                setCollected(true);

                // Auto-reset button after 3 seconds
                setTimeout( () => {
                    setCollected(false);
                    setMessage(null);
                }, 3000);
            } else {
                setHasError(true);
                setMessage("Failed to scan NFC tag");
            }
        } catch (err) {
            setHasError(true);
            setMessage("Failed to scan NFC tag");
        }

        setLoading(false);
    };

    const getButtonStyle = () => {
        if (loading) return [styles.collectButton, styles.disabledButton];
        if (collected) return [styles.collectButton, styles.successButton];
        if (hasError) return [styles.collectButton, styles.errorButton];
        return styles.collectButton;
    };

    const getButtonText = () => {
        if (loading) return "Collecting...";
        if (collected) return "Collected! ✅";
        if (hasError) return "Try Again";
        return "Collect";
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Banner />
            <View style={styles.innerContainer}>
                <ThemedText style={styles.title}>Collect a new monument!</ThemedText>

                <ThemedText style={styles.instructions}>
                    <ThemedText style={styles.bold}>How it works:{"\n"}</ThemedText>
                    1. Hold your phone close to a monument’s NFC tag.{"\n"}
                    2. Wait – the app will detect and collect the monument.{"\n"}
                    3. Once collected, you’ll see a confirmation and the monument will be added to your personal collection.
                </ThemedText>

                <Pressable
                    style={getButtonStyle()}
                    onPress={handleCollectMonument}
                    disabled={loading}
                >
                    {loading ? (
                        <View style={styles.loadingContent}>
                            <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
                            <Text style={styles.collectButtonText}>Collecting...</Text>
                        </View>
                    ) : (
                        <Text style={styles.collectButtonText}>{getButtonText()}</Text>
                    )}
                </Pressable>

                {message && (
                    <ThemedText style={[styles.result, hasError ? styles.errorText : styles.successText]}>
                        {message}
                    </ThemedText>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 32,
        backgroundColor: "#f5f5f5",
    },
    innerContainer: {
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    instructions: {
        fontSize: 16,
        color: "#333",
        textAlign: "left",
        marginBottom: 24,
    },
    bold: {
        fontWeight: "bold",
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        textAlign: "center",
    },
    successText: {
        color: "green",
    },
    errorText: {
        color: "#D62828",
    },
    banner: {
        height: 80,
        width: '100%',
        marginBottom: 16,
        marginTop: 20,
    },
    stripe: {
        flex: 1,
        width: '100%',
    },
    collectButton: {
        backgroundColor: '#2A9D8F',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        marginTop: 16,
        minWidth: 180,
        alignItems: 'center',
    },
    collectButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    loadingContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    successButton: {
        backgroundColor: '#4CAF50',
    },
    errorButton: {
        backgroundColor: '#D62828',
    },
    disabledButton: {
        opacity: 0.7,
    },
});
