import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { colors } from "@/constants/colors";
import React from "react";

export default function PickupType() {
    const { location, id, driveThru, carryOut, curbside, dineIn } = useLocalSearchParams();

    const pickupTypes = [
        {
            type: driveThru,
            label: 'Drive-thru',
            caption: 'Just hop in the line and let us know you have a mobile order.',
        },
        {
            type: carryOut,
            label: 'Carry-out',
            caption: 'Pick up your order inside the restaurant.',
        },
        {
            type: curbside,
            label: 'Curbside',
            caption: "Park in your designated spot and we'll bring your food to you.",
        },
        {
            type: dineIn,
            label: 'Dine-in',
            caption: "Come on in, choose a table, we’ll bring your order to you.",
        },    
    ];

    return (
        <SafeAreaView>
            <View className="px-3 gap-10">
                <View className="flex-row w-full justify-center items-center relative">
                    <TouchableOpacity
                        className="absolute left-0"
                        onPress={() => router.back()}
                    >
                        <Ionicons name="chevron-back" size={24} color={colors.primary} />
                    </TouchableOpacity>
                    <Text className="text-lg text-gray-700 font-semibold">{location}</Text>
                </View>
                <View className="w-full items-center">
                    <Text className="w-3/4 text-center text-lg">How would you like to receive your mobile order?</Text>
                </View>
                <View className="flex-column w-full gap-4">
                    {pickupTypes.map((pickup, index) => (
                        pickup.type === 'true' && (
                            <React.Fragment key={index}>
                                <TouchableOpacity 
                                    key={index} 
                                    className="flex-row items-center gap-2"
                                    onPress={() => router.push({ pathname: '../menu/[menu]', params: { location: location, pickupType: pickup.label } })}
                                >
                                    <Ionicons name="checkmark-circle-outline" size={60} color={colors.primary} />
                                    <View className="flex flex-column flex-1">
                                        <Text>{pickup.label}</Text>
                                        <Text className="text-gray-500">{pickup.caption}</Text>
                                    </View>
                                </TouchableOpacity>
                                {pickupTypes.length - 1 !== index &&
                                    <View className="h-[1px] mx-3 bg-gray-300 flex-1" />
                                }
                            </React.Fragment>
                        )
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};