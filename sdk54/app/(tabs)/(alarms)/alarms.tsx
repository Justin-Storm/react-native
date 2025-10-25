import { View, Text, ScrollView, Platform, Button, TouchableOpacity, Switch, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import { useClock } from '@/context/ClockContext'
import { List, Row } from 'react-native-ios-list';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

export default function Alarms() {
  const { alarms, toggleAlarm, removeAlarm } = useClock();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: 'Alarms',
          headerTintColor: '#fff',
          headerLargeTitle: true,
          headerLeft: () => (
            <>
              <Button title="Edit" color={'#fff'} />
            </>
          ),
          headerRight: () => (
            <TouchableOpacity 
              className="w-[35] h-[35] items-center justify-center"
              onPress={() => router.push('/addAlarm')}
            >
              <SymbolView name="plus" tintColor={'#fff'} />
            </TouchableOpacity>
          )
        }}
      />
      <View className='flex-1'>
        <FlatList 
          contentInsetAdjustmentBehavior='automatic'
          className='bg-black'
          data={alarms}
          keyExtractor={(item) => item.toString()}
          ListHeaderComponent={() => (
            <Text className='text-white font-bold text-2xl'>Other</Text>
          )}
          renderItem={({ item, index }) => (
            <Swipeable
              overshootRight={true}
              renderRightActions={() => null}
            >
              <View key={item.id} className={`bg-black rounded-3xl py-4 px-4`}>
                <View className='flex-row items-center justify-between'>
                  <Text className='text-white text-7xl font-light'>{item.time.slice(0, -3)}
                    <Text className='text-4xl'>{item.time.slice(-2)}</Text>
                  </Text>
                  <View className='justify-center'>
                    <Switch
                      value={item.isEnabled}
                      onValueChange={() => toggleAlarm(item.id)}
                    />
                  </View>
                </View> 
              </View>
            </Swipeable>
          )}
          ItemSeparatorComponent={() => (
            <View className='h-[1] bg-gray-700 mx-4' />
          )}
        />
      </View>
    </>
  )
}
