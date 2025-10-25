import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useClock } from '@/context/ClockContext';

export default function AddAlarm() {
    const [date, setDate] = useState(new Date());
    const { addAlarm } = useClock();


    const onChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

   const handleAddAlarm = () => {
        const timeString = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        addAlarm(timeString);
        router.back();
    };

  return (
    <>
        <Stack.Screen 
            options={{
                headerTitle: 'Add Alarm',
                headerTintColor: '#fff',
                headerTransparent: true,
                headerLeft: () => (
                    <TouchableOpacity 
                        className='w-[35] h-[35] items-center justify-center' 
                        onPress={() => router.back()}
                    >
                        <SymbolView name='xmark' tintColor={'#fff'} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity 
                        className='w-[35] h-[35] items-center justify-center rounded-full'
                        onPress={handleAddAlarm}
                    >
                        <SymbolView name={'checkmark'} tintColor={'orange'} />
                    </TouchableOpacity>
                )
            }}
        />
        <ScrollView contentInsetAdjustmentBehavior="automatic" className='bg-stone-800'>
            <View className='items-center px-4'>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="time" // or "date", "time", "countdown"
                    is24Hour={true} // or false, depending on preference
                    onChange={onChange}
                    display='spinner'
                />
            </View>
        </ScrollView>
    </>
  )
}