import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

export default function Player({ id, color }: any) {
    const player = useQuery(api.teams.getPlayer, { id: id as any });

    return (
        <TouchableOpacity 
            key={id} 
            className=' flex-1 rounded-2xl overflow-hidden'
            style={{ backgroundColor: color }}
            onPress={() => router.push({
                pathname: '/editPlayer',
                params: {
                    playerID: id,
                    firstName: player?.firstName,
                    lastName: player?.lastName,
                    feet: player?.heightFeet,
                    inches: player?.heightInches,
                    weight: player?.weight,
                    notes: player?.notes,
                }
            })}
        >
            <LinearGradient colors={['transparent', 'rgba(255, 255, 255, 0.3)']} style={{ flex: 1 }}>
                <View className="gap-4 p-4">
                    <Text className='text-xl font-bold text-white'>{player?.firstName} {player?.lastName}</Text>
                    {(player?.heightFeet || player?.heightInches) ? (
                        <Text className='text-lg text-white'>{player?.heightFeet ? `${player?.heightFeet}ft` : null} {player?.heightInches ? `${player?.heightInches}in` : null}</Text>
                    ) : null }
                    {player?.weight && (
                        <Text className='text-lg text-white'>{player?.weight}lbs</Text>
                    )}
                    {player?.notes && (
                        <Text className='text-lg text-white'>{player?.notes}</Text>
                    )}
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}