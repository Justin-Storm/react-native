import NotificationButton from "@/components/NotificationButton";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { primary } from "@/constants/Colors";

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: primary,
                tabBarPosition: 'bottom',
                tabBarStyle: { position: 'absolute' }
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    headerShown: true,
                    header: () => (
                        <View className="bg-white px-3 pb-2" style={{ paddingTop: insets.top }}>
                            <View className="flex-row items-center justify-between">
                                <NotificationButton />
                                <Text 
                                    className="text-xl text-center absolute w-full" 
                                    style={{ pointerEvents: "none", color: primary }}
                                >Week Shedule</Text>
                            </View>
                        </View>
                    ),
                    title: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={`home${focused ? '' : '-outline'}`} size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='test'
                options={{
                    headerShown: true,
                    header: () => (
                        <View className="bg-white px-3 pb-2" style={{ paddingTop: insets.top }}>
                            <View className="flex-row items-center justify-between">
                                <NotificationButton />
                                <Text 
                                    className="text-xl text-center absolute w-full" 
                                    style={{ pointerEvents: "none", color: primary }}
                                >Test</Text>
                            </View>
                        </View>
                    ),
                    title: 'Test',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={`flask${focused ? '' : '-outline'}`} size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name='more'
                options={{
                    headerShown: true,
                    header: () => (
                        <View className="bg-white px-3 pb-2" style={{ paddingTop: insets.top }}>
                            <View className="flex-row items-center justify-between">
                                <NotificationButton />
                                <Text 
                                    className="text-xl text-center absolute w-full" 
                                    style={{ pointerEvents: "none", color: primary }}
                                >More</Text>
                            </View>
                        </View>
                    ),
                    title: 'More',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name="menu" size={size + 5} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}
