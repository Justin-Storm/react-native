import { View, Image, Text, ScrollView, useColorScheme, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { TabRouter } from '@react-navigation/native'
import Styles from '@/app/styles';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { SymbolView } from 'expo-symbols';
import Post from '@/components/Post';
import AddButton from '@/components/AddButton';

export default function Home() {
  const colorScheme = useColorScheme();
  const styles = Styles(colorScheme);
  const isDark = colorScheme === 'dark';

  const posts = useQuery(api.content.getPosts);
  const deletePost = useMutation(api.content.deletePost);


  const user = useQuery(api.user.currentUser);
  const users = useQuery(api.user.getAppUsers);
  const addUser = useMutation(api.user.addUser);

  const handleDeletePost = async (id: any) => {
    try {
      await deletePost({ id });
    } catch (error) {
      Alert.alert("Error", "Failed to delete post");
    }
  }

  useEffect(() => {
    const checkAddUser = async () => {
      // Wait for both queries to load
      if (!user || !users) return;

      // Check if user already exists
      const userExists = users.some((appUser) => appUser.userID === user._id);

      if (!userExists && user._id) {
        try {
          await addUser({ userID: user._id });
          // Alert.alert("User added!");
        } catch (error) {
          Alert.alert('Error', 'Failed to add user');
        }
      }
    };

    checkAddUser();
  }, [user, users]);

  return (
    <>
      <Stack.Screen 
        options={{
          headerTransparent: true,
          headerTitle: 'DoubleClutch',
          headerLargeTitle: false,
          headerTitleStyle: styles.text,
          headerLeft: () => (
            <AddButton />
          ),
          headerRight: () => (
            <TouchableOpacity className='w-[35] h-[35] items-center justify-center'>
              <SymbolView name='heart' tintColor={isDark ? '#fff' : '#000'} />
            </TouchableOpacity>
          )
        }}
      />
      <View className='flex-1'>
        {!posts ? (
          <View className="flex-1 items-center justify-center gap-2" style={styles.background}>
            <ActivityIndicator size={'large'} />
            <Text className="text-2xl" style={styles.text}>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={posts}
            ListHeaderComponent={() => (
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerClassName='flex-row gap-3 px-2' 
                className='mb-[20]'
              >
                {['1', '2', '3', '4', '5'].map((item, index) => (
                  <TouchableOpacity key={index} className='w-[90] aspect-[1] rounded-full bg-blue-300 items-center justify-center'>
                    <Text className='font-bold text-2xl text-black'>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Post 
                key={item._id}
                id={item._id}
              />
            )}
            style={styles.background}
            contentInsetAdjustmentBehavior="automatic"
            contentContainerClassName='mt-[10]'
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  )
}