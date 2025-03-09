import {COLLECTION_API_URL, MONUMENT_API_URL} from "@/src/constants";
import {getUserId} from "@/src/userIdUtils";
import {Monument} from "@/src/Monument";

export async function createCollection() {
    const response = await fetch(COLLECTION_API_URL, { method: "POST" });
    const data = await response.json();
    return data.userId;
}

export async function updateCollection(monumentKey: string) {
    const userId = await getUserId();
    const response = await fetch(COLLECTION_API_URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userId, monumentKey}),
    });
    const monument = await response.json() as Monument;
    return monument.name;
}

export async function getCollection(): Promise<string | Monument[]> {
    const userId = await getUserId();
    const url = `${COLLECTION_API_URL}/${userId}`;
    const response = await fetch(url, {method: "GET"});
    if (response.status != 200) {
        return await response.json();
    } else {
        const collection = await response.json();
        return collection.monuments as Monument[];
    }
}

export async function getMonument(monumentKey: string) {
    const url = `${MONUMENT_API_URL}/${monumentKey}`;
    const response = await fetch(url, {method: "GET"});
    // Todo: check for correct response
    return await response.json() as Monument;
}