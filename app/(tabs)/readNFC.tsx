import {readNFC} from "@/src/nfc/nfcReader";
import {Button, View} from "react-native";

export default function NFCReader() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Scan NFC Tag" onPress={readNFC} />
        </View>
    )
}
