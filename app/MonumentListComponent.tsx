import {Monument} from "@/src/Monument";
import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";

interface MonumentListProps {
    monuments: Monument[];
}

const MonumentList: React.FC<MonumentListProps> = ({monuments}) => {
    return (
        <View style={styles.container}>
            <ThemedText style={styles.title}>Collected Monuments</ThemedText>
            <FlatList
                data={monuments}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => (
                    <View style={styles.card}>
                        <ThemedText style={styles.monumentName}>{item.name}</ThemedText>
                        <ThemedText style={styles.location}>{item.location}</ThemedText>
                        <ThemedText style={styles.description}>{item.description}</ThemedText>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3, // Android shadow
    },
    monumentName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    location: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: "#444",
    },
});

export default MonumentList;