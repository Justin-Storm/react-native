import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { router, Stack } from 'expo-router'
import { usePlayers } from '@/context/PlayersContext'
import { SymbolView } from 'expo-symbols'
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api'
import Player from '@/components/Player'

export default function Players() {
  // const { players, addPlayer } = usePlayers();
  const players = useQuery(api.teams.getPlayers);

  return (
    <>
      <Stack.Screen 
        options={{
          headerTitle: 'Players',
          headerLargeTitle: true,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerRight: () => (
            <TouchableOpacity
              className='w-[35] h-[35] items-center justify-center'
              onPress={() => router.push('/addPlayer')}
            >
              <SymbolView name='plus' tintColor={'#fff'} />
            </TouchableOpacity>
          )
        }}
      />
      <View className='flex-1'>
        <LinearGradient 
          colors={['#1d293d', '#314158']}
          style={{ flex: 1 }}
        >
          {players && !(players.length > 0) && (
            <View className='absolute top-0 left-0 w-full h-full items-center justify-center'>
              <SymbolView name='person.2.circle.fill' tintColor={'#0d6efd'} size={150} />
              <Text className='font-bold text-white text-3xl'>No players yet</Text>
            </View>
          )}
          <FlatList 
            data={players}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index}) => (
              <View className='flex-row flex-1 gap-4'>
                <Player
                  id={item._id}
                  color={'#0d6efd'}
                />
                {players ? players.length % 2 !== 0 && players.length === index + 1 && (
                  <View className='flex-1' />
                ) : null }
              </View>
            )}
            numColumns={2}
            className='pt-[20] px-4 gap-4'
            columnWrapperClassName='gap-4'
            contentContainerClassName='gap-4'
            contentInsetAdjustmentBehavior='automatic'
          />
        </LinearGradient>
      </View>
    </>
  )
}