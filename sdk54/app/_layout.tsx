import { Stack } from "expo-router";
import './global.css';
import { ThemeProvider } from "@/context/ThemeContext";
import { Text } from "react-native";
import { ClockProvider } from "@/context/ClockContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1}}>
      <ClockProvider>
        <ThemeProvider>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ThemeProvider>
      </ClockProvider>
    </GestureHandlerRootView>
  );
}
