import {Button, StyleSheet, View} from "react-native";
import {useState} from "react";
import {ThemedText} from "@/components/ThemedText";
import {collectMonument} from "@/src/CollectionManager";

export default function CollectMonumentScreen() {
    const [message, setMessage] = useState<string | null>(null);

    const handleCollectMonument = async () => {
        const message = await collectMonument();
        if (message) {
            setMessage(message);
        }
    };

    return (
        <View style={styles.container}>
            <ThemedText style={styles.title}>Here you can collect a new monument!</ThemedText>
            <Button title="Collect" onPress={handleCollectMonument} />
            {message && (
                <ThemedText style={styles.result}>{message}</ThemedText>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        color: "green",
    },
});
