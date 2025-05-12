import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { primary } from '@/constants/Colors';
import { router } from 'expo-router';

export default function AddItem() {

    const handleAddItem = () => {
        Alert.alert('Success', 'Add item button was pressed!');
    };

    return (
        <TouchableOpacity onPress={handleAddItem}>
            <Ionicons name='add-circle-outline' size={26} color={primary} />
        </TouchableOpacity>
    )
}
