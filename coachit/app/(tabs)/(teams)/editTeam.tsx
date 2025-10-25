import { usePlayers } from "@/context/PlayersContext";
import { api } from "@/convex/_generated/api";
import { useMutation, useQueries, useQuery } from "convex/react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, TextInput, TouchableOpacity, View, Text, KeyboardAvoidingView, Alert, Platform } from "react-native";
import { colors, sports } from "@/sports";
import { Ionicons } from '@expo/vector-icons'; 

export default function editTeam() {
    const { teamID } = useLocalSearchParams();
    const team = useQuery(api.teams.getTeam, { id: teamID as any });
    const updateTeam = useMutation(api.teams.updateTeam);
    const [name, setName] = useState(team?.name);
    const [sport, setSport] = useState(team?.sport);
    const [selectedColor, setSelectedColor] = useState(team?.color);

    useEffect(() => {
        setName(team?.name);
        setSport(team?.sport);
        setSelectedColor(team?.color ?? '#0d6efd');
    }, [team])

    const handleUpdateTeam = async () => {
        if (name && sport) {
            try {
                await updateTeam({
                    id: teamID as any,
                    name: name,
                    sport: sport,
                    color: selectedColor!,
                });
                router.back();
            } catch (error) {
                Alert.alert("Error", "Failed to add team");
            }
        }
    }

    return (
        <>
            <Stack.Screen 
                options={{
                    headerTitle: 'Edit Team',
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeft: () => (
                        <TouchableOpacity 
                            className="w-[35] h-[35] items-center justify-center"
                            onPress={() => router.back()}
                        >
                            <SymbolView name="xmark" tintColor={'#fff'} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity 
                            className="w-[35] h-[35] items-center justify-center"
                            onPress={handleUpdateTeam}
                        >
                            <SymbolView name="checkmark" tintColor={'#fff'} />
                        </TouchableOpacity>
                    )
                }}
            />
            <View className="flex-1 bg-slate-600">
                <ScrollView contentInsetAdjustmentBehavior="automatic" className="pt-[20]">
                    
                    <View className="px-4 gap-8">

                        <View className="w-full">
                            <Text className="ms-4 mb-1 text-xl font-bold text-white">Name</Text>
                            <View className="flex-row gap-4">
                                <TextInput 
                                    value={name}
                                    onChangeText={setName}
                                    placeholder="Team Name"
                                    className="bg-black/20 rounded-2xl text-xl text-white p-4 flex-1"
                                />
                            </View>
                        </View>

                        <View className="w-full">
                            <Text className="ms-4 mb-1 text-xl font-bold text-white">Sport</Text>
                            <ScrollView 
                                horizontal
                                className="flex-row bg-black/20 rounded-2xl"
                                contentContainerClassName="gap-4 p-4"
                                showsHorizontalScrollIndicator={false}
                            >
                                {sports.map(item => (
                                    <TouchableOpacity
                                        key={item}
                                        onPress={() => {
                                            if (item === sport) {
                                                setSport("");
                                            } else {
                                                setSport(item);
                                            }
                                        }}
                                        className={`px-4 py-3 rounded-full ${sport === item ? 'bg-blue-400' : 'bg-gray-400'}`}
                                    >
                                        <Text className={`font-bold ${sport === item ? 'text-white' : 'text-black'}`}>{item}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        
                        <View className="w-full">
                            <Text className="ms-4 mb-1 text-xl font-bold text-white">Color</Text>
                            <ScrollView 
                                horizontal
                                className="flex-row bg-black/20 rounded-2xl"
                                contentContainerClassName="gap-4 p-4"
                                showsHorizontalScrollIndicator={false}
                            >   
                                <TouchableOpacity
                                    onPress={() => setSelectedColor("#0d6efd")}
                                    className={`w-[40] aspect-[1] rounded-full rounded-full`}
                                    style={{ backgroundColor: selectedColor }}
                                ></TouchableOpacity>
                                <View className="h-[30] w-[1] bg-gray-500 my-auto" />
                                    {colors.filter(color => color !== selectedColor).map(color => (
                                        <TouchableOpacity
                                            key={color}
                                            onPress={() => setSelectedColor(color)}
                                            className={`w-[40] aspect-[1] rounded-full rounded-full`}
                                            style={{ backgroundColor: color }}
                                        ></TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>


                    </View>
                </ScrollView>
            </View>
        </>
    )
}