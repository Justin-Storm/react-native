import { colors } from "@/constants/colors";
import { notSignedInData } from "@/constants/data";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import NotLoggedInScreen from "../../components/NotLoggedInScreen";
import { useUser } from "@/lib/UserContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { logout } from "@/lib/appwriteConfig";

export default function Profile() {
    const { user, setUser } = useUser();
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1" style={{ backgroundColor: colors.lightbg }}>
            {user ? (
                <View className="px-3" style={{ paddingTop: insets.top }}>
                    <TouchableOpacity className="flex flex-row items-center gap-2 absolute right-3" style={{ marginTop: insets.top + 10 }} onPress={() => logout(setUser)}>
                        <Text className="text-lg font-bold" style={{ color: colors.primary }}>Account</Text>
                        <Ionicons name="settings" size={20} color={colors.primary} />
                    </TouchableOpacity>
                </View>
            ) : (
                <NotLoggedInScreen
                    title={notSignedInData.foryou.title}
                    description={notSignedInData.foryou.description}
                    image={notSignedInData.foryou.image}
                />
            )}
        </View>
    );
}            