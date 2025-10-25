import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function stopwatch() {
  return (
    <>
        <Stack.Screen 
          options={{
            headerTitle: 'Stopwatch',
            headerTintColor: '#fff',
            headerTransparent: true,
            headerShown: false
          }}
        />
        <View className='flex-1 bg-black'>
          
        </View>
    </>
  )
}