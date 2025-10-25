import { Stack } from "expo-router";
import './global.css';
import { PlayersProvider } from "@/context/PlayersContext";
import { ConvexProvider } from "convex/react";
import { ConvexReactClient } from "convex/react";
import { Platform } from "react-native";

const convexURL = process.env.EXPO_PUBLIC_CONVEX_URL!;
const convexClient = new ConvexReactClient(convexURL);

export default function RootLayout() {
  return (
    <ConvexProvider client={convexClient}>
      <PlayersProvider>
        <Stack>
          <Stack.Screen 
            name="(tabs)"
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="addPlayer"
            options={{
              presentation: 'pageSheet',
            }}
          />
          <Stack.Screen 
            name="editPlayer"
            options={{
              presentation: Platform.OS === 'ios' ? 'pageSheet' : 'modal',
            }}
          />
        </Stack> 
      </PlayersProvider>
    </ConvexProvider>
  )
}
