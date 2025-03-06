import NfcManager, {Ndef, NfcTech } from 'react-native-nfc-manager';
import {Alert} from "react-native";
import {Monument} from "@/src/Monument";
import {BACKEND_BASE_URL, COLLECTION_API_URL} from "@/src/constants";
import {getUserId} from "@/src/userIdUtils";
import {updateCollection} from "@/src/arqivApiClient";

NfcManager.start();
NfcManager.cancelTechnologyRequest();

export async function readNFC(): Promise<string | undefined> {
    try {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        const tag = await NfcManager.getTag();

        const payload = tag!.ndefMessage[0].payload;
        Alert.alert('NFC Tag Detected!', JSON.stringify(tag));
        // @ts-ignore
        return Ndef.text.decodePayload(payload);
    } catch (error) {
        console.warn('NFC Error:', error);
    } finally {
        await NfcManager.cancelTechnologyRequest();
    }
}