import { View, Text, Button } from "react-native";
import * as Notifications from "expo-notifications";

export default function Cart() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Button title="Send Notification" onPress={undefined} />
        </View>
    );
}