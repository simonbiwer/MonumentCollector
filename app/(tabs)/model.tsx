import { StyleSheet } from 'react-native';
import ShowModel from "@/src/models/ShowModel";

export default function ModelScreen() {
    return (<ShowModel />);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
