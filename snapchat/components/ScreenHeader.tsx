import { Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { TouchableOpacity, View } from "react-native";

export default function ScreenHeader({ transparent, title, addFriendsColor }: { transparent: boolean, title: string, addFriendsColor: string }) {
    return (
        <Stack.Screen 
            options={{
                headerTransparent: transparent,
                headerTitle: title,
                headerTitleStyle: { color: '#fff' },
                headerLeft: () => (
                    <TouchableOpacity className="w-[35] h-[35] items-center justify-center">
                        <SymbolView name="person.fill" tintColor={'#fff'} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <View className="flex-row gap-3">
                        <TouchableOpacity className="w-[35] h-[35] items-center justify-center">
                            <SymbolView name="bell" tintColor={'#fff'} />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-[35] h-[35] items-center justify-center">
                            <SymbolView name="person.badge.plus" tintColor={addFriendsColor} />
                        </TouchableOpacity>
                        <TouchableOpacity className="w-[35] h-[35] items-center justify-center">
                            <SymbolView name="ellipsis" tintColor={'#fff'} />
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
    )
} 