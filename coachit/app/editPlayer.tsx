import { usePlayers } from "@/context/PlayersContext";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { SymbolView } from "expo-symbols";
import { useEffect, useMemo, useState } from "react";
import { Dimensions, ScrollView, TextInput, TouchableOpacity, View, Text, KeyboardAvoidingView, Alert } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function EditPlayer() {
    const { playerID } = useLocalSearchParams();
    const player = useQuery(api.teams.getPlayer, { id: playerID as any })
    const deletePlayer = useMutation(api.teams.deletePlayer);
    const updatePlayer = useMutation(api.teams.updatePlayer);
    const [firstName, setFirstName] = useState(player?.firstName);
    const [lastName, setLastName] = useState(player?.lastName);
    const [feet, setFeet] = useState(player?.heightFeet);
    const [inches, setInches] = useState(player?.heightInches);
    const [weight, setWeight] = useState(player?.weight);
    const [notes, setNotes] = useState(player?.notes);

    useEffect(() => {
        setFirstName(player?.firstName);
        setLastName(player?.lastName);
        setFeet(player?.heightFeet);
        setInches(player?.heightInches);
        setWeight(player?.weight);
        setNotes(player?.notes);
    }, [player])

    const handleUpdatePlayer = async () => {
        if (firstName && lastName) {
            try {
                await updatePlayer({
                    id: playerID as any,
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

    const handleDeletePlayer = async () => {
        try {
            Alert.alert("Delete Player", `Are you sure you want to delete the player "${player?.firstName} ${player?.lastName}"?`, [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await deletePlayer({ id: playerID as any })
                        router.back();
                    }
                }
            ])
        } catch (error) {
            Alert.alert("Error", "Failed to delete player");
        }
    }
    
    return (
        <>
            <Stack.Screen 
                options={{
                    headerTitle: 'Edit Player',
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
                        <View className="flex-row gap-3">
                            <TouchableOpacity 
                                className="w-[35] h-[35] items-center justify-center"
                                onPress={handleUpdatePlayer}
                            >
                                <SymbolView name="checkmark" tintColor={'#fff'} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                className="w-[35] h-[35] items-center justify-center"
                                onPress={handleDeletePlayer}
                            >
                                <SymbolView name="trash" tintColor={'#fff'} />
                            </TouchableOpacity>
                        </View>
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
    