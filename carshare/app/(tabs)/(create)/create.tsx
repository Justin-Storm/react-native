import { View, Text, ScrollView, useColorScheme, TextInput, Button, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { TabRouter } from '@react-navigation/native'
import Styles from '@/app/styles';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function Home() {
  const colorScheme = useColorScheme();
  const styles = Styles(colorScheme);
  const addPost = useMutation(api.content.addPost);

  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');

  const handleAddPost = async () => {
    try {
      if (!username) {
        return;
      }
      await addPost({ username, description });
      setUsername('');
      setDescription('');
      Alert.alert("Success");
    } catch (error) {
      Alert.alert("Error", "Failed to add post");
    }
  };

  return (
    <>
      <Stack.Screen   
        options={{
          headerTransparent: true,
          headerTitle: 'Create',
          headerLargeTitle: true,
          headerTitleStyle: styles.text,
          headerRight: () => (
            <TouchableOpacity 
              className='h-[35] justify-center px-3'
              onPress={handleAddPost}
            >
              <Text className='font-bold text-xl text-[#0d6efd]'>Post</Text>
            </TouchableOpacity>
          )
        }}
      />
      <View className='flex-1'>
        <ScrollView style={styles.background} contentInsetAdjustmentBehavior='automatic'>
          <View className='px-5 gap-4'>
            <TextInput 
              placeholder='Username'
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
             <TextInput 
              placeholder='Description'
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
          </View>
        </ScrollView>
      </View>
    </>
  )
}