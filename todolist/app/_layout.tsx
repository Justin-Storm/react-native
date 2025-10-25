import { Stack } from "expo-router";
import './global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListsProvider } from '@/contexts/ListContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ListsProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen 
              name="newlist"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ListsProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}


