import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { primary } from "@/constants/Colors";
import BackButton from "@/components/BackButton";

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
                <BackButton text={'Back'} />
                <Text
                    className="text-xl font-semibold text-center absolute w-full capitalize"
                    style={{ pointerEvents: "none", color: primary }}
                >
                    Task Details
                </Text>
            </View>
          </View>
        ),
      }}
    />
  );
}