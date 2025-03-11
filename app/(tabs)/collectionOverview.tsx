import {ActivityIndicator} from 'react-native';

import {Monument} from "@/src/Monument";
import React, {useCallback, useState} from "react";
import {getCollection} from "@/src/arqivApiClient";
import MonumentList from "@/app/components/MonumentListComponent";
import {useFocusEffect} from "@react-navigation/core";

export default function CollectionOverviewScreen() {
    const [monuments, setMonuments] = useState<Monument[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);

    useFocusEffect(
        useCallback(() => {
                const fetchMonuments = async () => {
                    try {
                        const response = await getCollection();
                        if (typeof response === "string") {
                            setMessage(response);
                        } else {
                            setMonuments(response);
                        }
                    } catch (error) {
                        console.error("Error fetching monuments:", message);
                    } finally {
                        setLoading(false);
                    }
                };

                fetchMonuments();
            }, []
        )
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return <MonumentList monuments={monuments} />;
}