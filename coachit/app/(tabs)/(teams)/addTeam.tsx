import { usePlayers } from "@/context/PlayersContext";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { router, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Dimensions, ScrollView, TextInput, TouchableOpacity, View, Text, KeyboardAvoidingView, Alert } from "react-native";
import { colors, sports } from "@/sports";

export default function AddTeam() {
    // const { addTeam } = usePlayers();
    const addTeam = useMutation(api.teams.addTeam);
    const [name, setName] = useState("");
    const [sport, setSport] = useState("");
    const [selectedColor, setSelectedColor] = useState("#0d6efd");

    const handleAddTeam = async () => {
        if (name && sport && selectedColor) {
            try {
                await addTeam({
                    name: name,
                    sport: sport,
                    color: selectedColor,
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
                    headerTitle: 'Add Team',
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
                            onPress={handleAddTeam}
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