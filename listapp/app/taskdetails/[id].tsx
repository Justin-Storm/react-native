import { useGlobalSearchParams, Link, router } from 'expo-router';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { primary } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { taskDetailsColors } from '@/constants/data';
import { IconSymbol } from '@/components/IconSymbol.ios';

export default function TaskDetails() {
  const { id, title } = useGlobalSearchParams();
  const [titleText, setTitleText] = useState(title);
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <View className='flex-1 p-6 gap-10 justify-between'>
      

      <View className='gap-10'>
      <View className='w-full bg-white rounded-lg border border-gray-300 flex-row items-center p-3'>
        <TextInput
          value={titleText}
          onChangeText={setTitleText}
          placeholder={title}
          className='flex-1'
        />
      </View>

      <View className='flex-row justify-between items-center'>
        {taskDetailsColors.map((color, index) => (
          <TouchableOpacity 
            className='rounded-full h-12 w-12 items-center justify-center' 
            key={index} 
            style={{ backgroundColor: selectedColor === index ? color : 'transparent' }}
            onPress={() => setSelectedColor(index)}
          >
            <IconSymbol name='flag.fill' size={18} color={selectedColor === index ? '#fff' : color} /> 
          </TouchableOpacity>
        ))}
      </View>
      </View>

      <View className='w-full h-12 bg-red-500 rounded-lg mb-5'></View>
    </View>
  );
}
