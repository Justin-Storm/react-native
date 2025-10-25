import { usePlayers } from "@/context/PlayersContext";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Dimensions, ScrollView, TextInput, TouchableOpacity, View, Text, KeyboardAvoidingView, Alert, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddGeme() {
    const { teamID } = useLocalSearchParams();
    const team = useState
    const addGame = useMutation(api.teams.addGame);
    const [name, setName] = useState("");
    const [ourScore, setOurScore] = useState("");
    const [opposingScore, setOpposingScore] = useState("");
    const [opposingTeamName, setOpposingTeamName] = useState("");
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());

    const handleAddGame = async () => {
        if (name) {
            try {
                await addGame({
                    teamID: teamID as any,
                    id: Date.now().toString(),
                    name: name,
                    date: 'October 23, 2025',
                    ourScore: ourScore,
                    opposingName: opposingTeamName,
                    opposingScore: opposingScore,
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
                    headerTitle: 'Add Game',
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
                            onPress={handleAddGame}
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
                            <Text className="ms-4 mb-1 text-xl font-bold text-white">Game Name</Text>
                            <View className="flex-row gap-4">
                                <TextInput 
                                    value={name}
                                    onChangeText={setName}
                                    placeholder="Game Name"
                                    className="bg-black/20 rounded-2xl text-xl text-white p-4 flex-1"
                                />
                            </View>
                        </View>

                        <View className="w-full">
                            <Text className="ms-4 mb-1 text-xl font-bold text-white">Our Team</Text>
                            <View className="flex-row gap-4">
                                <TextInput 
                                    value={ourScore}
                                    onChangeText={setOurScore}
                                    placeholder="Our Score"
                                    className="bg-black/20 rounded-2xl text-xl text-white p-4 flex-1"
                                    keyboardType="number-pad"
                                />
                            </View>
                        </View>

                        <View className="w-full">
                            <Text className="ms-4 mb-1 text-xl font-bold text-white">Opposing Team</Text>
                            <View className="flex-row gap-4">
                                <TextInput 
                                    value={opposingTeamName}
                                    onChangeText={setOpposingTeamName}
                                    placeholder="Opposing Name"
                                    className="bg-black/20 rounded-2xl text-xl text-white p-4 flex-1"
                                />
                                <TextInput 
                                    value={opposingScore}
                                    onChangeText={setOpposingScore}
                                    placeholder="Opposing Score"
                                    className="bg-black/20 rounded-2xl text-xl text-white p-4 flex-1"
                                    keyboardType="number-pad"
                                />
                            </View>
                        </View>

                        {/* <View className="flex-1 items-center">
                            <Text className="text-white text-lg mt-3 font-semibold">{date.toString()}</Text>
                        </View> */}

                    </View>
                </ScrollView>
            </View>
        </>
    )
}