import { View, Text } from 'react-native'
import React, { lazy } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { primary } from '@/constants/Colors';
import { pinNumbers } from '@/constants/data';


export default function notifications() {
    const { id } = useGlobalSearchParams();
    const pin = 9239;

    return (
        <ScrollView className='px-6 pt-6 pb-32 gap-7'>
            {id === '1' && 
                <Text>Index 1</Text>
            }
            {id === '5' &&
                    <View className='flex-column gap-3'>
                        <View className='flex-row justify-between'>
                            <Text className='font-bold'>Location</Text>
                            <View className='items-center' style={{ width: 70 }}>
                                <Text className='font-bold'>PIN</Text>
                            </View>
                        </View>
                        {pinNumbers.map((item, index) => (
                            <View key={index} className='flex-row w-full justify-between'>
                                <View className='h-full flex-1 flex-row items-center'>
                                    <Text>{item.location}</Text>
                                </View>
                                <View className='flex-row p-2 justify-between bg-blue-200 rounded-md' style={{ width: 70 }}>
                                    <Ionicons name='lock-closed' size={16} color={primary} />
                                    <Text className='font-semibold text-md' style={{ color: primary }}>{item.pin}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
            }
        </ScrollView>
    )
}