import { View, Text, useColorScheme, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import Styles from './styles';
import { SymbolView } from 'expo-symbols';
import { Ionicons } from '@expo/vector-icons';
import { useAuthActions } from '@convex-dev/auth/react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function ProfileSettings() {
    const colorScheme = useColorScheme();
    const styles = Styles(colorScheme);
    const { signOut } = useAuthActions();
    const deleteAccount = useMutation(api.user.deleteUser);

    const handleDeleteAccount = async () => {
        try {
            signOut();
            await deleteAccount();
        } catch (error) {
            Alert.alert("Error", "Failed to delete account");
        }
    }

    return (
        <>
            <Stack.Screen 
                options={{
                    headerTitle: 'Profile Settings',
                    headerTitleStyle: styles.text,
                    headerBackButtonDisplayMode: 'minimal',
                    headerTransparent: true,
                }}
            />
            <View className='flex-1'>
                <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.background}>
                    <View className='px-4 mt-[20]'>
                        <TouchableOpacity
                            className="flex-row items-center gap-2 p-4 bg-red-500/10 rounded-2xl"
                            onPress={handleDeleteAccount}
                        >
                            <Ionicons name="log-out-outline" color={'#ff0000'} size={30} />
                            <Text className="text-[#ff0000] font-bold text-xl">Delete Account</Text>
                        </TouchableOpacity>              
                    </View> 
                </ScrollView>
            </View>
        </>
    )
}