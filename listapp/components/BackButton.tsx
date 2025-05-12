import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { primary } from '@/constants/Colors'
import { router } from 'expo-router'

export default function BackButton(props: { text: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }) {
  return (
    <TouchableOpacity
        className='flex-row gap-1 items-center'
        onPress={() => router.back()}
    >
        <Ionicons name='chevron-back' size={28} color={primary} />
        <Text className='font-semibold text-lg' style={{ color: primary }}>{props.text}</Text>
    </TouchableOpacity>
  )
}