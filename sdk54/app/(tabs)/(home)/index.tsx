import { Link, router, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Text, View, ScrollView, TouchableOpacity, Platform, Button, FlatList, Image, Dimensions, useColorScheme } from "react-native";
import React, { useEffect, useState } from 'react';
import { useTheme } from "@/context/ThemeContext";

const newlocations = [
  {
    name: 'Philadelphia',
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    timezone: 'America/New_York',
  },
  {
    name: 'Cupertino',
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    timezone: 'America/Los_Angeles'
  }
]


export default function Index() {
  const [locations, setLocations] = useState(newlocations);
  
  useEffect(() => {
    const updateTime = () => {
      setLocations(locations => locations.map(location => ({
        ...location,
        time: new Date().toLocaleTimeString('en-US', { timeZone: location.timezone, hour: '2-digit', minute: '2-digit' })
      })));
    }
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  function getTimeZoneDifference(time: string) {
    const currentTime = new Date();
    return currentTime.getTime();
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerTitle: 'World Clock',
          headerTransparent: true,
          headerLargeTitle: true,
          headerTintColor: '#fff',
          headerLeft: () => (
            <>
              <Button title="Edit" color={'#fff'} />
            </>
          ),
          headerRight: () => (
            <TouchableOpacity className="w-[35] h-[35] items-center justify-center">
              <SymbolView name="plus" tintColor={'#fff'} />
            </TouchableOpacity>
          )
        }}
      />
      <View className="flex-1">
        <FlatList
          data={locations}
          keyExtractor={(item: any) => item.name.toString()}
          renderItem={({ item, index }) => (
            <View key={index} className="border-b border-gray-800 py-6 flex-row justify-between items-center">
              <View>
                {/* <Text className="text-white">{getTimeZoneDifference(location.time)}</Text> */}
                <Text className="text-white text-2xl font-semibold">{item.name}</Text>
              </View>
              <Text className="text-white text-6xl font-light">{item.time}</Text>
            </View>
          )}
          className="flex-1 bg-black"
          contentInsetAdjustmentBehavior="automatic"
          contentContainerClassName="px-4"
        />
      </View>
    </>
  );
}
