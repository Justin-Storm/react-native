import AddItem from "@/components/AddItem";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { primary } from '@/constants/Colors';
import { IconSymbol } from "@/components/IconSymbol.ios";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: primary,
                tabBarShowLabel: true,
                tabBarPosition: 'bottom',
                tabBarStyle: { position: 'absolute', borderTopColor: 'transparent' },
                /*tabBarBackground: () => (
                    <BlurView
                        intensity={100}
                        style={StyleSheet.absoluteFill}
                    />
                ),*/
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    headerShown: false,
                    header: () => (
                        <View className="bg-white px-3 pb-2" style={{ paddingTop: insets.top }}>
                            <View className="flex-row items-center h-7 justify-between">
                                <Text 
                                    className="text-xl font-semibold text-center absolute w-full"
                                    style={{ pointerEvents: 'none', color: primary }}
                                >Home</Text>
                            </View>
                        </View>
                    ),
                    title: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaskedView
                            maskElement={
                                <IconSymbol name={`house${focused ? '.fill' : ''}`} size={32} color="black" />
                            }
                        >
                            <LinearGradient
                                colors={
                                    focused
                                        ? ['#FF0080', '#0000FF']
                                        : [color, color]
                                }
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ width: 32, height: 32 }}
                            />
                        </MaskedView>
                    ),
                }}
            />
            <Tabs.Screen
                name='settings'
                options={{
                    headerShown: true,
                    header: () => (
                        <View className="bg-white px-3 pb-2" style={{ paddingTop: insets.top }}>
                            <View className="flex-row items-center h-7 justify-between">
                                <Text 
                                    className="text-xl font-semibold text-center absolute w-full"
                                    style={{ pointerEvents: "none", color: primary }}
                                >Settings</Text>
                            </View>
                        </View>
                    ),
                    title: 'Settings',
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaskedView
                            maskElement={
                                <IconSymbol name={`gearshape${focused ? '.fill' : ''}`} size={30} color="black" />
                            }
                        >
                            <LinearGradient
                                colors={
                                    focused
                                        ? ['#FF0080', '#0000FF']
                                        : [color, color]
                                }
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ width: 28, height: 28 }}
                            />
                        </MaskedView>
                    ),
                }}
            />
            <Tabs.Screen
                name='test'
                options={{
                    headerShown: true,
                    header: () => (
                        <View className="bg-white px-3 pb-2" style={{ paddingTop: insets.top }}>
                            <View className="flex-row items-center h-7 justify-between">
                                <Text 
                                    className="text-xl font-semibold text-center absolute w-full"
                                    style={{ pointerEvents: "none", color: primary }}
                                >Test</Text>
                            </View>
                        </View>
                    ),
                    title: 'Test',
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaskedView
                            maskElement={
                                <Ionicons name={`flask${focused ? '' : '-outline'}`} size={30} color="black" />
                            }
                        >
                            <LinearGradient
                                colors={
                                    focused
                                        ? ['#FF0080', '#0000FF']
                                        : [color, color]
                                }
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{ width: 30, height: 30 }}
                            />
                        </MaskedView>
                    ),
                }}
            />
        </Tabs>
    )
}
