import { View, Text, Touchable, TouchableOpacity, useColorScheme } from 'react-native'
import React from 'react'
import { SymbolView } from 'expo-symbols'

export default function AddButton() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <TouchableOpacity className='w-[35] h-[35] items-center justify-center'>
            <SymbolView name='plus' tintColor={isDark ? '#fff': '#000'} />
        </TouchableOpacity>
    )
}