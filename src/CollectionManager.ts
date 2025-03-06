import {getUserId, saveUserId} from "@/src/userIdUtils";
import {createCollection, updateCollection} from "@/src/arqivApiClient";
import {readNFC} from "@/src/nfcUtils";

export async function createCollectionIfNotPresent() {
    const userId = await getUserId();
    console.log("found user id: " + userId);
    if (!userId) {
        console.log("creating user id...");
        const newUserId = await createCollection();
        await saveUserId(newUserId);
        console.log("saved user id:" + newUserId);
    }
}

export async function collectMonument(): Promise<string> {
    const key = await readNFC();
    if (!key) {
        return "Failed to scan NFC tag";
    }
    const monumentName = await updateCollection(key);
    return `Monument ${monumentName} collected!`;
}