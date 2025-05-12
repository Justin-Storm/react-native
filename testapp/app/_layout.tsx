import { Stack } from "expo-router";
import './global.css';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotificationButton from "@/components/NotificationButton";
import { View, Text, BackHandler } from "react-native";
import { primary } from "@/constants/Colors";
import { useSafeAreaEnv } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "@/components/BackButton";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="subpages" 
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  )
}
