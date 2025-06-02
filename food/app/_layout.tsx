import { Stack } from "expo-router";
import './global.css';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { UserProvider } from "@/lib/UserContext";
import { StatusBar } from "expo-status-bar";


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <UserProvider>
            <StatusBar style='dark' />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>
        </UserProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
