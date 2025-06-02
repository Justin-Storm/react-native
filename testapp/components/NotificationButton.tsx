import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { primary } from '@/constants/Colors'

const NotificationButton = () => {
  const handleAlert = () => {
    Alert.alert('Alert', 'You clicked notifications.');
  };

  return (
    <TouchableOpacity className='bg-slate-200 w-9 rounded-full p-2 items-center justify-center' onPress={handleAlert}>
        <Ionicons name='notifications' size={16} color={primary} />
    </TouchableOpacity>
  )
}

export default NotificationButton