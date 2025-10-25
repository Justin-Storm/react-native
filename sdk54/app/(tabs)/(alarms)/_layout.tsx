import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function AlarmLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name='alarms'
      />
      <Stack.Screen 
        name='addAlarm'
        options={{
          presentation: 'pageSheet',
        }}
      />
    </Stack>
  )
}