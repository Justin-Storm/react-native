import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Stack>
      <Stack.Screen 
        name="sign-in" 
        options={{ 
          headerShown: true,
          header: () => (
            <View className="items-center bg-white border border-slate-300" style={{ paddingTop: insets.top, paddingBottom: 12 }}>
              <TouchableOpacity className="absolute left-4 bottom-[12] flex-row items-center gap-2" onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color={colors.primary} />
                <Text className="text-lg font-bold" style={{ color: colors.primary }}>Back</Text>
              </TouchableOpacity>
              <Text className="text-xl font-bold">Sign In</Text>
            </View>
          )
        }}  
      />
    </Stack>
  );
}