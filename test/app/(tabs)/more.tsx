import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import NotificationButton from '@/components/NotificationButton'
import { Ionicons } from '@expo/vector-icons'
import { primary } from '@/constants/Colors'
import { moreLinks } from '@/constants/data'

export default function more() {
  const userName = 'Justin Storm';
  const position = 'Crew Member';
  const workAddress = "1084 Freehold-Rt 9 McDonald's - Freehold";
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  return (
    <ScrollView contentContainerClassName='px-6 pt-6 pb-24 gap-7'>
      
      <View className='flex-row justify-between items-center'>
        <View className='flex-row gap-2 items-center'>
          <View className='bg-white rounded-full h-12 w-12 items-center justify-center'>
            <Ionicons name='person' size={24} color={'#888'} />
          </View>
          <View>
            <Text className='font-semibold text-lg'>{userName}</Text>
            <Text>{position}</Text>
          </View>
        </View>
        <View className='bg-slate-200 rounded-full h-8 w-8 items-center justify-center'>
          <Ionicons name='pencil' size={16} color={'#222'} />
        </View>
      </View>

      <View className='flex-row gap-2 justify-between items-center'>
        <View className='bg-white rounded-md p-2 w-12 h-14 justify-center justify-center'>
          <Ionicons name='fast-food' size={24} color={'red'} />
        </View>
        <Text className='font-semibold flex-1' numberOfLines={1}>{workAddress}</Text>
        <View className='bg-slate-200 rounded-full h-8 w-8 items-center justify-center ml-2'>
          <Ionicons name='ellipsis-horizontal' size={16} color={'#222'} />
        </View>
      </View>

      <View className='flex-row justify-center items-center flex-wrap gap-3'>
        {moreLinks.gridLinks.map((link, index) => (
          <View
            key={index}
            className='w-[48%] rounded-lg px-4 py-5 flex-row items-center gap-2 bg-white shadow-sm shadow-black/10'
          >
            <View className='w-7 h-7 rounded-full bg-blue-200' />
            <Text>{link.text}</Text>
          </View>
        ))}
        <View className='w-[48%]'></View>
      </View>

      <View>
        <View className='flex-row justify-between items-center' onTouchStart={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}>
          <View className='flex-row gap-2 items-center'>
            <Ionicons name='person-circle' size={32} color={'#999'} />
            <Text className='text-lg'>Account Settings</Text>
          </View>
          <Ionicons name={`chevron-${isAccountDropdownOpen ? 'up' : 'down'}`} size={24} color={'#333'} />
        </View>
        <View className={`gap-3 px-5 overflow-hidden ${isAccountDropdownOpen ? '' : 'h-0'}`}>
          {moreLinks.accountSettingsLinks.map((link, index) => (
            <View key={index} className={`bg-white rounded-lg p-4 ${index ===  0 ? 'mt-3' : ''}`}>
              <Text className='text-black'>{link.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className='w-full bg-slate-200 h-0.5' style={{ width: '200%', transform: [{ translateX: '-15%' }] }} />

      <View>
        <View className='flex-row justify-between items-center' onTouchStart={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}>
          <View className='flex-row gap-2 items-center'>
            <Ionicons name='information-circle' size={32} color={'#999'} />
            <Text className='text-lg'>About</Text>
          </View>
          <Ionicons name={`chevron-${isAboutDropdownOpen ? 'up' : 'down'}`} size={24} color={'#333'} />
        </View>
        <View className={`gap-3 px-5 overflow-hidden ${isAboutDropdownOpen ? '' : 'h-0'}`}>
          {moreLinks.aboutLinks.map((link, index) => (
            <View key={index} className={`bg-white rounded-lg p-4 ${index ===  0 ? 'mt-3' : ''}`}>
              <Text className='text-black'>{link.text}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity className='w-full bg-gray-300 rounded-lg items-center justify-center p-3'>
        <Text className='font-bold text-lg text-black'>Log out</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}