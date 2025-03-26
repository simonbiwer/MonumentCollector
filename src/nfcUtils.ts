import { Alert, Platform } from "react-native";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";
import { Monument } from "@/src/Monument";
import { BACKEND_BASE_URL, COLLECTION_API_URL } from "@/src/constants";
import { getUserId } from "@/src/userIdUtils";
import { updateCollection } from "@/src/arqivApiClient";

// Nur auf iOS/Android starten – NICHT im Web
if (Platform.OS !== 'web' && NfcManager?.start) {
    NfcManager.start();
    NfcManager.cancelTechnologyRequest();
}

export async function readNFC(): Promise<string | undefined> {
    // NFC auf Web-Plattform deaktivieren
    if (Platform.OS === 'web') {
        Alert.alert("NFC not supported on Web");
        return;
    }

    try {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        const tag = await NfcManager.getTag();

        const payload = tag?.ndefMessage?.[0]?.payload;
        Alert.alert('NFC Tag Detected!', JSON.stringify(tag));

        // @ts-ignore: decodePayload is safe hier
        return Ndef.text.decodePayload(payload);
    } catch (error) {
        console.warn('NFC Error:', error);
    } finally {
        await NfcManager.cancelTechnologyRequest();
    }
}
