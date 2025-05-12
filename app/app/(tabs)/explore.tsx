import { View, Text, TextInput, ScrollView, Image, Platform, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { carData, featuredCarData } from '@/constants/data';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import CarCard from '@/components/CarCard';
import VerticalCarCard from '@/components/VerticalCarCard';
import { SafeAreaView } from "react-native-safe-area-context";

const explore = () => {
  const [search, setSearch] = useState('');
  const allCars = featuredCarData.concat(carData);
  const filteredCars = allCars.filter(car =>
    `${car.make} ${car.model} ${car.year}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView className='px-3'>
        <View className='flex-row bg-slate-200 gap-3 items-center h-12 px-3 rounded-full mb-3'>
          <Ionicons name='search' size={24} color={'#000'} />
          <TextInput
            placeholder='Search car'
            className='flex-1 h-full'
            placeholderTextColor={'#888'}
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={{ display: search === '' ? 'none' : 'flex' }} onPress={() => setSearch('')}>
            <Ionicons name='close' size={24} color={'#000'} />
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
            bounces={true}
            data={filteredCars}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperClassName="gap-3"
            contentContainerClassName="gap-3 pb-24"
            renderItem={({ item }) => (
              <View className="flex-1" style={{ maxWidth: '49%'}}>
                <VerticalCarCard car={item} />
              </View>
            )}
        />
    </SafeAreaView>
  )
}

export default explore