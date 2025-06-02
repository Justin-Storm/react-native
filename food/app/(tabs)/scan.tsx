import { colors } from "@/constants/colors";
import { View } from "react-native";
import React from "react";
import { notSignedInData } from "@/constants/data";
import NotLoggedInScreen from "../../components/NotLoggedInScreen";
import { useUser } from "@/lib/UserContext";

export default function Scan() {
    const { user } = useUser();
    
    return (
        <View className="flex-1" style={{ backgroundColor: colors.lightbg }}>
            {user ? (
                null
            ) : (
                <NotLoggedInScreen
                    title={notSignedInData.scan.title}
                    description={notSignedInData.scan.description}
                    image={notSignedInData.scan.image}
                />
            )}
        </View>
    );
}