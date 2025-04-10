import { Alert, Platform } from "react-native";
import NfcManager, { Ndef, NfcTech } from "react-native-nfc-manager";

// Only start for iOS/Android – NOT for web
if (Platform.OS !== 'web' && NfcManager?.start) {
    NfcManager.start();
    NfcManager.cancelTechnologyRequest();
}

export async function readNFC(): Promise<string | undefined> {
    // Disable NFC for Web
    if (Platform.OS === 'web') {
        Alert.alert("NFC not supported on Web");
        return;
    }

    try {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        const tag = await NfcManager.getTag();

        const payload = tag?.ndefMessage?.[0]?.payload;
        Alert.alert('NFC Tag Detected!', JSON.stringify(tag));

        // @ts-ignore: decodePayload is safe here
        return Ndef.text.decodePayload(payload);
    } catch (error) {
        console.warn('NFC Error:', error);
    } finally {
        await NfcManager.cancelTechnologyRequest();
    }
}
