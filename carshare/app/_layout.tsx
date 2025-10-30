import { Stack } from "expo-router";
import './global.css';
import { ConvexProvider, ConvexProviderWithAuth, useConvexAuth } from "convex/react";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

function InitialLayout() {
  const { isAuthenticated } = useConvexAuth();

  return (
    <Stack>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="profileSettings" />
      </Stack.Protected>
    </Stack>
  )
}
export default function RootLayout() {
  return (
    <ConvexAuthProvider storage={AsyncStorage} client={convex}>
      <InitialLayout />
    </ConvexAuthProvider>
  )
}
