import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { HelloWave } from '@/components/HelloWave';
import { createCollectionAndUserId } from '@/src/CollectionManager';
import {getUserId} from "@/src/userIdUtils";

export default function HomeScreen() {
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUserId = async () => {
            const storedId = await getUserId();
            setUserId(storedId);
            setLoading(false);
        };
        checkUserId();
    }, []);

    const handleStart = async () => {
        const newUserId = await createCollectionAndUserId();
        setUserId(newUserId);
        router.push('/collectMonument');
    };

    const Banner = () => (
        <View style={styles.banner}>
            <View style={[styles.stripe, { backgroundColor: '#ffffff' }]} />
            <View style={[styles.stripe, { backgroundColor: '#D62828' }]} />
            <View style={[styles.stripe, { backgroundColor: '#F7B801' }]} />
            <View style={[styles.stripe, { backgroundColor: '#2A9D8F' }]} />
        </View>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!userId) {
        return (
            <View style={styles.container}>
                <Banner />
                <View style={styles.logoContainer}>
                    <Image source={require('@/assets/images/DoCH_Logo.png')} style={styles.logo} resizeMode="contain" />
                    <Image source={require('@/assets/images/DAAD_Logo.png')} style={styles.logo} resizeMode="contain" />
                </View>
                <Text style={styles.welcomeTitle}>Welcome to Arqiv</Text>
                <Text style={styles.descriptionText}>
                    Discover and collect digital monuments in the museum.
                    This app is part of the “Digitalization of Cultural Heritage” project.
                </Text>
                <Pressable style={styles.button} onPress={handleStart}>
                    <Text style={styles.buttonText}>Start Collection</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#fff', dark: '#1D3D47' }}
            headerImage={<Banner />}
        >
            <View style={styles.logoContainerTight}>
                <Image source={require('@/assets/images/DoCH_Logo.png')} style={styles.logoLarge} resizeMode="contain" />
                <Image source={require('@/assets/images/DAAD_Logo.png')} style={styles.logoLarge} resizeMode="contain" />
            </View>

            <ThemedView style={styles.titleSection}>
                <Text style={styles.welcomeTitle}>Welcome back</Text>
                <Text style={styles.descriptionText}>
                    Explore your personal monument collection and keep discovering cultural heritage.
                </Text>
            </ThemedView>

            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Monument Collector</ThemedText>
                <HelloWave />
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">What is this app for?</ThemedText>
                <ThemedText>
                    This app allows users to collect and explore digital monuments in museums. It is
                    designed to raise awareness of cultural heritage through playful interaction.
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">How does it work?</ThemedText>
                <ThemedText>
                    Simply scan a monument using NFC and add it to your personal collection. You can revisit,
                    reflect, and share your discoveries anytime.
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Workshop – Digitalization of Cultural Heritage</ThemedText>
                <ThemedText>
                    This app is part of the GI Informatics Festival 2025 and the international workshop
                    “Digitalization of Cultural Heritage,” where students explore how digital tools can help
                    preserve and present history.{"\n\n"}
                    Read more: https://dl.gi.de/server/api/core/bitstreams/3432dab3-8370-4596-8ea3-d195d08eaef1/content
                </ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
        justifyContent: 'flex-start',
    },
    banner: {
        height: 80,
        width: '100%',
        marginBottom: 0,
        marginTop: 20,
    },
    stripe: {
        flex: 1,
        width: '100%',
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        marginBottom: 24,
    },
    logoContainerTight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        marginBottom: 16,
    },
    logo: {
        width: 120,
        height: 60,
    },
    logoLarge: {
        width: 190,
        height: 100,
    },
    titleSection: {
        paddingHorizontal: 24,
        paddingTop: 0,
        paddingBottom: 16,
        alignItems: 'center',
    },
    welcomeTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    descriptionText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        paddingHorizontal: 12,
    },
    button: {
        backgroundColor: '#2A9D8F',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginTop: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'center',
        marginVertical: 16,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 16,
        paddingHorizontal: 16,
    },
});
