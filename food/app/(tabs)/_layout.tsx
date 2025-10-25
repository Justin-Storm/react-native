import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { colors } from '@/constants/colors';
import { useUser } from '@/lib/UserContext';
// RMS976J7PK
export default function TabLayout() {
    const { user } = useUser();

    return (
        <Tabs 
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: '#888',
                tabBarStyle: {
                    position: 'absolute',
                    height: 85,
                },
            }}
        >
            <Tabs.Screen 
                name="index" 
                options={{
                    title: 'Menu',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name="restaurant-outline" size={size} color={color} />
                    ),
                }} 
            />
            <Tabs.Screen 
                name="rewards" 
                options={{
                    headerShown: true,
                    title: 'Rewards',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name="gift-outline" size={size} color={color} />
                    ),
                }} 
            />
            <Tabs.Screen 
                name="scan" 
                options={{
                    headerShown: true,
                    title: 'Scan',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name="qr-code-outline" size={size} color={color} />
                    ),
                }} 
            />
            <Tabs.Screen 
                name="profile" 
                options={{
                    headerShown: user ? false : true,
                    title: 'For You',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }} 
            />
            <Tabs.Screen 
                name="cart" 
                options={{
                    title: 'Your Order',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name="fast-food-outline" size={size} color={color} />
                    ),
                }} 
            />
        </Tabs>
    );
};