import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
    const iconSize = 30;

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#0d6efd',
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Ionicons name='home' size={iconSize} color={color} />
                }}
            />
            <Tabs.Screen
                name='explore'
                options={{
                    headerShown: false,
                    title: 'Explore',
                    tabBarIcon: ({ color }) => <Ionicons name='search' size={iconSize} color={color} />
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    headerShown: false,
                    title: 'Account',
                    tabBarIcon: ({ color }) => <Ionicons name='person' size={iconSize} color={color} />
                }}
            />
        </Tabs>
    );
}