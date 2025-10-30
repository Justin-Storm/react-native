import { View, Text, useColorScheme, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Styles from '@/app/styles'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function Users() {
    const colorScheme = useColorScheme();
    const styles = Styles(colorScheme);
    const appUsers = useQuery(api.user.getAppUsers);

    return (
        <>
            <Stack.Screen 
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTitle: 'Users',
                    headerTitleStyle: styles.text,
                }}
            />
            <View className='flex-1'>
                <FlatList 
                    data={appUsers}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity className='flex-row items-center gap-2'>
                            <Image
                                source={{ uri: item.profilePicture }}
                                className='rounded-full w-[65] aspect-[1]'
                            />
                            <Text className='font-bold text-lg' style={styles.text}>@{item.username}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.background}
                    className='pt-[20]'
                    contentContainerClassName='px-4 gap-4'
                />
            </View>
        </>
    )
}