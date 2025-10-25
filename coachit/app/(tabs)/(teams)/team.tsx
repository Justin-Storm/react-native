import { usePlayers } from "@/context/PlayersContext";
import { api } from "@/convex/_generated/api";
import { useMutation, useQueries, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, Text, Dimensions, Alert, ScrollView } from "react-native";
import { getTeamIcon } from '@/sports';
import Player from "@/components/Player";


export default function Team() {
    const { teamID } = useLocalSearchParams();
    const { teams } = usePlayers();
    const { width } = Dimensions.get('window');
    const team = useQuery(api.teams.getTeam, { id: teamID as any });
    const games = useQuery(api.teams.getGames, { id: teamID as any });
    const allPlayers = useQuery(api.teams.getPlayers);
    const deleteTeam = useMutation(api.teams.deleteTeam);
    const [teamName, setTeamName] = useState(team?.name);
    const [wins, setWins] = useState(games?.filter(game => Number(game.ourScore) > Number(game.opposingScore)).length ?? 0);
    const [losses, setLosses] = useState(games?.filter(game => Number(game.ourScore) < Number(game.opposingScore)).length! ?? 0);
    const [ties, setTies] = useState(games?.filter(game => Number(game.ourScore) === Number(game.opposingScore)).length ?? 0);

    const players = allPlayers?.filter(player => team?.players?.includes(player._id));

    useEffect(() => {
        setTeamName(team?.name);
        setWins(games?.filter(game => Number(game.ourScore) > Number(game.opposingScore)).length ?? 0);
        setLosses(games?.filter(game => Number(game.ourScore) < Number(game.opposingScore)).length ?? 0);
        setTies(games?.filter(game => Number(game.ourScore) === Number(game.opposingScore)).length ?? 0);
    }, [team]);

    const teamStandings = [
        {
            icon: getTeamIcon(team?.sport.toLowerCase() as any),
            color: '#0d6efd',
            text: 'Games',
            value: games?.length,
        },
        {
            icon: 'trophy.circle.fill',
            color: 'limegreen',
            text: 'Wins',
            value: wins,
        },
        {
            icon: 'xmark.circle.fill',
            color: 'red',
            text: 'Losses',
            value: losses,
        },
        {
            icon: 'equal.circle.fill',
            color: 'orange',
            text: 'Ties',
            value: ties,
        }
    ]

    const handleDeleteTeam = async () => {
        try {
            Alert.alert("Delete Team", `Are you sure you want to delete the "${team?.name}" team?`, [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        router.back();
                        await deleteTeam({ id: team?._id as any });
                    }
                }
            ])
        } catch (error) {
            Alert.alert("Error", "Failed to delete team");
        }
    }

    const getWin = (score1: string, score2: string) => {
        const ourScore = Number(score1);
        const opposingScore = Number(score2);

        if (ourScore > opposingScore) {
            return 'Win';
        } else if (ourScore === opposingScore) {
            return 'Tie';
        } else {
            return 'Loss';
        }
    }

    return (
        <>
            <Stack.Screen 
                options={{
                    headerTitle: teamName || "",
                    headerTitleStyle: { color: team?.color },
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerRight: () => (
                        <View className="flex-row gap-3">
                            <TouchableOpacity 
                                className="w-[35] h-[35] items-center justify-center"
                                onPress={() => router.push({
                                    pathname: '/editTeam',
                                    params: { teamID: team?._id }
                                })}
                            >
                                <SymbolView name={getTeamIcon(team?.sport.toLowerCase() as string)} tintColor={'#fff'} />
                            </TouchableOpacity>
                             <TouchableOpacity 
                                className="w-[35] h-[35] items-center justify-center"
                                onPress={() => router.push({
                                    pathname: '/teamPlayers',
                                    params: {
                                        teamID: team?._id,
                                    }
                                })}
                            >
                                <SymbolView name="person.badge.plus" tintColor={'#fff'} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                className="w-[35] h-[35] items-center justify-center"
                                onPress={() => router.push({ 
                                    pathname: '/addGame',
                                    params: { teamID: team?._id }
                                })}
                            >
                                <SymbolView name={'plus'} tintColor={'#fff'} />
                            </TouchableOpacity>
                            <TouchableOpacity className="w-[35] h-[35] items-center justify-center" onPress={handleDeleteTeam}>
                                <SymbolView name={'trash'} tintColor={'#fff'} />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerLargeTitle: true,
                }}
            />
            <View className="flex-1">
                <LinearGradient 
                    colors={['#1d293d', '#314158']}
                      style={{ flex: 1 }}
                >
                    {players?.length === 0 && games?.length === 0 ? (
                        <View className="flex-1 items-center justify-center">
                            <SymbolView name="person.2.circle.fill" tintColor={team?.color} size={150} />
                            <Text className="font-bold text-3xl text-white">No games and players</Text>
                        </View>
                    ) : (
                        <ScrollView 
                            contentInsetAdjustmentBehavior="automatic" 
                            className="pt-[20]"
                        >
                            <FlatList
                                scrollEnabled={false}
                                data={teamStandings}
                                keyExtractor={(item) => item.text.toString()}
                                renderItem={({ item }) => (
                                    <View className="flex-1 items-center bg-white/20 rounded-2xl p-4">
                                        <SymbolView 
                                            name={item.icon as any} 
                                            tintColor={item.color} 
                                            size={50}
                                        />
                                        <Text className="font-bold text-4xl text-white mt-2">{item.value}</Text>
                                        <Text className="font-bold text-xl text-white">{item.text}</Text>
                                    </View>
                                )}
                                numColumns={4}
                                columnWrapperClassName="gap-4"
                                contentContainerClassName="px-4"
                                className="mb-[20]"
                            />
                            {players && players.length > 0 && (
                                <FlatList 
                                    scrollEnabled={false}
                                    data={players}
                                    keyExtractor={(item) => item.toString()}
                                    ListHeaderComponent={
                                        players && players.length > 0 ? (
                                            <Text className="text-white font-bold text-xl ms-4">Players</Text>
                                        ) : null
                                    }
                                    renderItem={({ item, index }) => (
                                        <View className="flex-row flex-1 gap-4">
                                            <Player
                                                id={item._id}
                                                color={team?.color}
                                            />
                                            {players ? players.length % 2 !== 0 && players.length === index + 1 && (
                                                <View style={{ width: '48%' }} />
                                            ) : null }
                                        </View>
                                    )}
                                    numColumns={2}
                                    className="px-4 mb-[40]"
                                    contentContainerClassName="gap-4"
                                    columnWrapperClassName="gap-4"
                                />
                            )} 
                            {games && games.length > 0 && (
                                <FlatList 
                                    scrollEnabled={false}
                                    data={games}
                                    keyExtractor={(item) => item.id.toString()}
                                    ListHeaderComponent={
                                        games && games.length > 0 ? (
                                            <Text className="text-white font-bold text-xl ms-4">Games</Text>
                                        ) : null
                                    }
                                    renderItem={({ item }) => (
                                        <TouchableOpacity 
                                            key={item.id} 
                                            className="flex-1 rounded-2xl overflow-hidden"
                                            style={{ backgroundColor: team?.color }}
                                        >
                                            <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.3)']}>
                                                <View className="p-5">
                                                    <Text className="font-bold text-3xl text-white">{item.name}</Text>
                                                    <Text className="font-bold text-white text-lg">{team?.name} VS {item.opposingName}</Text>
                                                    <View className="mt-[20]">
                                                        <Text>{getWin(item.ourScore, item.opposingScore)}</Text>
                                                        <Text className="font-bold text-xl text-white">{item.ourScore}</Text>
                                                        <Text className="font-bold text-xl text-white">{item.opposingScore}</Text>
                                                    </View>
                                                </View>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    )}
                                    numColumns={1}
                                    className="px-4"
                                    contentContainerClassName="gap-4"
                                    // columnWrapperClassName="gap-4"
                                />
                            )}
                        </ScrollView>
                    )}
                </LinearGradient>
            </View>
        </>
    )
}