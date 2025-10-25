import { usePlayers } from "@/context/PlayersContext";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { router, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Dimensions, ScrollView, TextInput, TouchableOpacity, View, Text, KeyboardAvoidingView, Alert } from "react-native";

export default function AddPlayer() {
    // const { addPlayer } = usePlayers();
    const addPlayer = useMutation(api.teams.addPlayer);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [feet, setFeet] = useState("");
    const [inches, setInches] = useState("");
    const [weight, setWeight] = useState("");
    const [notes, setNotes] = useState("");

    const handleAddPlayer = async () => {
        if (firstName && lastName) {
            try {
                await addPlayer({
                    firstName: firstName,
                    lastName: lastName,
                    heightFeet: feet,
                    heightInches: inches,
                    weight: weight,
                    notes: notes,
                })
                router.back();
            } catch (error: any) {
                Alert.alert("Error", error);
            }
        }
    }

    return (
        <>
            <Stack.Screen 
                options={{
                    headerTitle: 'Add Player',
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
                            onPress={handleAddPlayer}
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
                            <Text className="ms-4 text-xl font-bold text-white">Name</Text>
                            <View className="flex-row gap-4">
                                <TextInput 
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    placeholder="First Name"
                                    className="bg-black/20 rounded-2xl text-xl text-white p-4 flex-1"
                                />
                                <TextInput 
                                    value={lastName}
                                    onChangeText={setLastName}
                                    placeholder="Last Name"
                                    className="bg-black/20 rounded-2xl text-xl text-white p-4 flex-1"
                                />
                            </View>
                        </View>

                         <View className="w-full">
                            <Text className="ms-4 text-xl font-bold text-white">Height</Text>
                            <View className="flex-row gap-4">
                                <TextInput 
                                    value={feet}
                                    onChangeText={setFeet}
                                    placeholder="Feet"
                                    className="bg-black/20 rounded-2xl text-xl text-white p-4 flex-1"
                                    keyboardType="number-pad"
                                />
                                <TextInput 
                                    value={inches}
                                    onChangeText={setInches}
                                    placeholder="Inches"
                                    className="bg-black/20 rounded-2xl text-xl text-white p-4 flex-1"
                                    keyboardType="number-pad"
                                />
                            </View>
                        </View>

                        <View className="w-full">
                            <Text className="ms-4 text-xl font-bold text-white">Weight</Text>
                            <View className="flex-row gap-4">
                                <TextInput 
                                    value={weight}
                                    onChangeText={setWeight}
                                    placeholder="Weight"
                                    className="bg-black/20 rounded-2xl text-xl text-white p-4 flex-1"
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        <View className="w-full">
                            <Text className="ms-4 text-xl font-bold text-white">Notes</Text>
                            <View className="flex-row gap-4">
                                <TextInput 
                                    value={notes}
                                    onChangeText={setNotes}
                                    placeholder="Notes"
                                    className="bg-black/20 rounded-2xl text-xl text-white p-4 flex-1"
                                    numberOfLines={8}
                                    multiline
                                />
                            </View>
                        </View>
                        

                    </View>
                </ScrollView>
            </View>
        </>
    )
}