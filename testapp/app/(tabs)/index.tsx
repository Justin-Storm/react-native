import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const shiftsData = [
  { id: '1', date: '2025-05-01', time: '9:00 AM - 5:00 PM', role: 'Server', location: 'Main Hall' },
  { id: '2', date: '2025-05-02', time: '11:00 AM - 7:00 PM', role: 'Bartender', location: 'Bar A' },
  { id: '3', date: '2025-05-04', time: '2:00 PM - 10:00 PM', role: 'Host', location: 'Lobby' },
];

// Get start of week (Sunday)
const getStartOfWeek = (date: string) => {
  const d = new Date(date + 'T12:00:00');
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  return d;
};

// Get all 7 dates in a week
const getWeekDates = (date: string) => {
  const start = getStartOfWeek(date);
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d.toISOString().split('T')[0];
  });
};

const ScheduleScreen = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [weekOffset, setWeekOffset] = useState<number>(0);

  const today = new Date();
  today.setDate(today.getDate() + weekOffset * 7);
  const weekStart = getStartOfWeek(today.toISOString().split('T')[0]);
  const weekDates = getWeekDates(weekStart.toISOString().split('T')[0]);

  return (
    <View className="flex-1 pt-6 mb-12">
      {/* Week Navigation */}
      <View className="flex-row items-center justify-between px-5 py-3 bg-gray-100">
        <TouchableOpacity onPress={() => setWeekOffset((prev) => prev - 1)}>
          <Text className="text-xl">←</Text>
        </TouchableOpacity>
        <Text className="font-semibold">
          {new Date(weekDates[0] + 'T12:00:00').toLocaleDateString()} - {new Date(weekDates[6] + 'T12:00:00').toLocaleDateString()}
        </Text>
        <TouchableOpacity onPress={() => setWeekOffset((prev) => prev + 1)}>
          <Text className="text-xl">→</Text>
        </TouchableOpacity>
      </View>

      {/* Inline Week View */}
      <View className="flex-row justify-between py-2 border-b border-gray-300">
        {weekDates.map((date) => {
          const isSelected = selectedDate === date;
          const hasDot = shiftsData.some((s) => s.date === date);
          const localDate = new Date(date + 'T12:00:00');

          return (
            <TouchableOpacity key={date} onPress={() => setSelectedDate(date)}>
              <View className={`items-center p-2 rounded-xl ${isSelected ? 'bg-blue-600' : ''}`}>
                <Text className={`text-xs ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                  {localDate.toLocaleDateString('en-US', { weekday: 'short' })}
                </Text>
                <Text className={`text-base font-semibold ${isSelected ? 'text-white' : 'text-black'}`}>
                  {localDate.getDate()}
                </Text>
                {hasDot && <View className={`w-1.5 h-1.5 mt-1 rounded-full ${isSelected ? 'bg-white' : 'bg-blue-600'}`} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView contentContainerClassName='pt-6 pb-12' showsVerticalScrollIndicator={false}>
        {weekDates.map((date) => {
          const localDate = new Date(date + 'T12:00:00');
          const shiftsForDate = shiftsData.filter((s) => s.date === date);

          return (
            <View key={date} className="mb-6">
              <Text className="text-lg font-bold mb-2 px-3">
                {localDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>

              {shiftsForDate.length > 0 ? (
                shiftsForDate.map((item) => (
                  <View key={item.id} className="bg-red-800 p-4 mb-3">
                    <Text className='text-lg font-semibold text-white mb-3'>{item.role}</Text>
                    <Text className="text-md text-white">{item.time}</Text>
                    <Text className="tetx-md text-white">{item.location}</Text>
                  </View>
                ))
              ) : (
                <View className='h-32 w-full bg-white items-center justify-center'>
                  <Text className="text-gray-400">Not scheduled</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ScheduleScreen;
