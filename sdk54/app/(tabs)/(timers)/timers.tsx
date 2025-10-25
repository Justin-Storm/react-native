import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'

export default function Timers() {
  return (
    <>
        <Stack.Screen 
          options={{
            headerTitle: 'Timers',
            headerTintColor: '#fff',
            headerTransparent: true,
            headerLargeTitle: true,
          }}
        />
        <View className='flex-1'>
          <ScrollView contentInsetAdjustmentBehavior='automatic' className='bg-black'>
          
          </ScrollView>
        </View>
    </>
  )
}