import { Stack } from "expo-router";
import { View } from "react-native";

export default function Search() {
    return (
        <>
            <Stack.Screen 
                options={{
                    headerTransparent: true,
                    headerTitleStyle: { color: '#fff' },
                    headerTitle: 'Search',
                    headerSearchBarOptions: {
                        placement: 'automatic',
                    }
                }}
            />
            <View className="flex-1 bg-stone-950"></View>
        </>
    )
}