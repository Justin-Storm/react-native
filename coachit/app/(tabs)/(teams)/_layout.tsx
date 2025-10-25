import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function WorkoutsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
            />
            <Stack.Screen 
                name="addTeam"
                options={{
                    presentation: 'pageSheet',
                }}
            />
            <Stack.Screen 
                name="addGame"
                options={{
                    presentation: 'pageSheet',
                }}
            />
            <Stack.Screen
                name="editTeam"
                options={{
                    presentation: Platform.OS === 'ios' ? 'pageSheet' : 'modal',
                }}
            />
            <Stack.Screen 
                name="teamPlayers"
                options={{
                    presentation: 'pageSheet',
                }}
            />
        </Stack>
    )
}