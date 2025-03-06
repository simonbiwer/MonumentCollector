import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_ID_KEY = "user_id";

export async function getUserId(): Promise<string | null> {
    return await AsyncStorage.getItem(USER_ID_KEY);
}

export async function saveUserId(userId: string): Promise<void> {
    await AsyncStorage.setItem(USER_ID_KEY, userId);
}