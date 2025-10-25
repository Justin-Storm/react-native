import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { usePlayers } from '@/context/PlayersContext'
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';
import { SymbolView } from 'expo-symbols';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { _internal_maybeHideAsync } from 'expo-router/build/utils/splash';

export default function TeamPlayers() {
    const { teamID } = useLocalSearchParams();
    const team = useQuery(api.teams.getTeam, { id: teamID as any });
    const updateTeam = useMutation(api.teams.updateTeam);
    const players = useQuery(api.teams.getPlayers);
    const [selectedPlayers, setSelectedPlayers] = useState(team?.players);

    const togglePlayer = (player: string) => {
        setSelectedPlayers(prev =>
            prev?.includes(player)
            ? prev?.filter(id => id !== player)
            : [...prev || [], player]
        )
    }

    const handleUpdateTeam = async () => {
        try {
            await updateTeam({
                id: team?._id as any,
                name: team?.name as any,
                sport: team?.sport as any,
                players: selectedPlayers,
                color: team?.color as any,
            });
            router.back();
        } catch (error) {
            Alert.alert("Error", "Failed to update list");
        }
    }

    return (
        <>
            <Stack.Screen 
                options={{
                    headerTitle: `${team?.name} players`,
                    headerLargeTitle: true,
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeft: () => (
                        <TouchableOpacity
                            className='w-[35] h-[35] items-center justify-center'
                            onPress={() => router.back()}
                        >
                            <SymbolView name='xmark' tintColor={'#fff'} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            className='w-[35] h-[35] items-center justify-center'
                            onPress={handleUpdateTeam}
                        >
                            <SymbolView name='checkmark' tintColor={'#fff'} />
                        </TouchableOpacity>
                    )
                }}
            />
            <FlatList 
                data={players}
                keyExtractor={item => item._id.toString()}
                renderItem={({ item }) => {
                    const isSelected = selectedPlayers?.includes(item._id);
;                   return (
                        <View key={item._id} className='flex-row items-center ps-10 pe-4 gap-8'>
                            <TouchableOpacity 
                                onPress={() => togglePlayer(item._id)}
                            >
                                <SymbolView 
                                    name={isSelected ? 'checkmark.square.fill' :'square'} 
                                    size={35} 
                                    tintColor={isSelected ? '#00bfff' : '#999'} />
                            </TouchableOpacity>
                            <Text className='text-white font-bold text-xl capitalize'>{item.firstName} {item.lastName}</Text>
                        </View>
                    )
                }}
                contentInsetAdjustmentBehavior='automatic'
                contentContainerClassName='gap-6'
                className='pt-[20] bg-slate-600'
            />
        </>
    )
}