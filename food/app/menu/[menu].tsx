import { View, Text, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaInsetsContext, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { databases } from '@/lib/appwriteConfig';
import { ScrollView } from 'react-native-gesture-handler';

const menuCategories = [
    { id: '1', name: 'Entrées' },
    { id: '2', name: 'Salads' },
    { id: '3', name: 'Sides' },
    { id: '4', name: "Kid's Meals" },
    { id: '5', name: "Beverages" },
    { id: '6', name: "Treats" },
];

export default function Menu() {
    const insets = useSafeAreaInsets();
    const { location, pickupType } = useLocalSearchParams();

    return (
        <View className="flex-1">
            <View className='px-3 w-full bg-gray-200' style={{ paddingTop: insets.top, height: 100 }}>
                <View className='items-center w-full'>
                    <TouchableOpacity 
                        className='absolute left-0' 
                        style={{ top: '50%', transform: [{ translateY: '-50%' }] }}
                        onPress={() => {
                            router.back();
                            router.back();
                        }}
                    >
                        <Ionicons name="close" size={30} color={colors.black} />
                    </TouchableOpacity>
                    <Text className='text-sm'>{pickupType} at</Text>
                    <Text className='font-semibold'>{location}</Text>
                </View>
            </View>
            <ScrollView>
            <View className='flex-column'>
                {menuCategories.map(category => (
                    <TouchableOpacity 
                        key={category.id} 
                        className='px-6 py-10 flex-row justify-between items-center'
                        onPress={() => router.push({ pathname: '../menuCategory/[menuCategory]', params: { category: category.name } })}
                    >
                        <Text className='text-lg font-semibold'>{category.name}</Text>
                        <Ionicons name="chevron-forward" size={22} color={colors.primary} />
                    </TouchableOpacity>
                ))}
            </View>
            </ScrollView>
        </View>
    );
}