import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "@/components/BackButton";
import { primary } from "@/constants/Colors";

export default function SubpagesLayout() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();
  const title = typeof params.title === 'string' ? params.title : 'Subpage';

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => (
          <View className="bg-white px-3 pb-2" style={{ paddingTop: insets.top }}>
            <View className="flex-row items-center justify-between">
              <BackButton />
              <Text
                className="text-xl text-center absolute w-full"
                style={{ pointerEvents: "none", color: primary }}
              >
                {title}
              </Text>
            </View>
          </View>
        ),
      }}
    />
  );
}
