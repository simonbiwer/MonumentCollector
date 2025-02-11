import NfcManager, {Ndef, NfcTech } from 'react-native-nfc-manager';
import {Alert} from "react-native";

NfcManager.start();
NfcManager.cancelTechnologyRequest();

export async function readNFC() {
    try {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        const tag = await NfcManager.getTag();

        const payload = tag!.ndefMessage[0].payload;
        // @ts-ignore
        const text = Ndef.text.decodePayload(payload);
        console.log('NFC Tag Data:', text);
        Alert.alert('NFC Tag Detected!', JSON.stringify(tag));

    } catch (error) {
        console.warn('NFC Error:', error);
    } finally {
        await NfcManager.cancelTechnologyRequest();
    }
}