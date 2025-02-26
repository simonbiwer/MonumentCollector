import AsyncStorage from "@react-native-async-storage/async-storage";
import {BACKEND_BASE_URL} from "@/src/constants";

const USER_ID_KEY = "user_id";
const API_PATH = `${BACKEND_BASE_URL}/api/collection`;

export async function getUserId(): Promise<string | null> {
    return await AsyncStorage.getItem(USER_ID_KEY);
}

export async function saveUserId(userId: string): Promise<void> {
    await AsyncStorage.setItem(USER_ID_KEY, userId);
}

export async function createUserId() {
    const response = await fetch(API_PATH, { method: "POST" });
    const data = await response.json();
    return data.userId;
}

export async function createUserIdIfNotPresent() {
    const userId = await getUserId();
    console.log("found user id: " + userId);
    if (!userId) {
        console.log("creating user id...");
        const newUserId = await createUserId();
        await saveUserId(newUserId);
        console.log("saved user id:" + newUserId);
    }
}
