import { router, Stack } from "expo-router";
import { Button, FlatList, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { usePlayers } from "@/context/PlayersContext";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { getTeamIcon } from "@/sports";

export default function Index() {
  const [isEditing, setIsEditing] = useState(false);
  const isNotIos = Platform.OS !== 'ios';
  // const { teams } = usePlayers();
  const teams = useQuery(api.teams.getTeams);

  // const teams = [
  //   {
  //     name: 'Yankees',
  //     icon: 'baseball.fill',
  //     sport: 'baseball',
  //     games: [
  //       {
  //         name: 'Game 1',
  //       },
  //       {
  //         name: 'Game 2',
  //       },
  //       {
  //         name: 'Game 3',
  //       }
  //     ],
  //     players: [],
  //   },
  //   {
  //     name: 'Giants',
  //     icon: 'football.fill',
  //     sport: 'football',
  //     games: [],
  //     players: []
  //   },
  // ];

  return (
    <>
      <Stack.Screen 
        options={{
          headerTitle: 'Teams',
          headerLargeTitle: true,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerLeft: () => (
            <>
              {isEditing ? (
                <TouchableOpacity 
                  className="w-[35] h-[35] items-center justify-center" 
                  onPress={() => setIsEditing(false)}
                >
                  <SymbolView name="checkmark" tintColor={'#fff'} />
                </TouchableOpacity>
              ) : (
                <Button 
                  title="Edit"
                  color={'#fff'}
                  onPress={() => setIsEditing(true)}
                />
              )}
            </>
          ),
          headerRight: () => (
            <TouchableOpacity className="w-[35] h-[35] items-center justify-center" onPress={()=> router.push('/addTeam')}>
              <SymbolView name="plus" tintColor={'#fff'} />
            </TouchableOpacity>
          ),
        }}
      />
      <View className="flex-1">
        <LinearGradient 
          colors={['#1d293d', '#314158']}
          style={{ flex: 1 }}
        >
          {teams && !(teams.length > 0) && (
            <View className="absolute w-full h-full top-0 left-0 items-center justify-center">
              <SymbolView name="person.2.circle.fill" tintColor={"#0d6efd"} size={150} />
              <Text className="font-bold text-3xl text-white">No teams</Text>
            </View>
          )}
          <FlatList
            data={teams}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item, index }) => (
              <View className="flex-row gap-4 flex-1">
                <TouchableOpacity 
                  key={item.name} 
                  className="rounded-2xl flex-1 aspect-[1] overflow-hidden"
                  style={{ backgroundColor: item.color }}
                  onPress={() => 
                    router.push({ 
                      pathname: '/team',  
                      params: { 
                        teamID: item._id,
                      } 
                    }
                  )}
                >
                  <LinearGradient colors={['transparent', 'rgba(255, 255, 255, 0.3)']} style={{ flex: 1 }}>
                    <View className="gap-4 p-4">
                      <View className="flex-row justify-between gap-4">
                        <Text className="text-2xl font-bold text-white flex-1">{item.name}</Text>
                        <SymbolView name={getTeamIcon(item.sport.toLowerCase())} size={28} tintColor={'#fff'} />
                      </View>
                      <Text className="text-lg font-bold text-white">
                        {(item.games ?? []).length} {(item.games ?? []).length === 1 ? 'game' : 'games'}
                      </Text>

                      <Text className="text-lg font-bold text-white">
                        {(item.players ?? []).length} {(item.players ?? []).length === 1 ? 'player' : 'players'}
                      </Text>
                      {isEditing && (
                        <TouchableOpacity className="mt-auto ms-auto">
                          <SymbolView name="nosign" tintColor={'red'} size={28} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                {teams ? teams.length % 2 !== 0 && teams.length === index + 1 && (
                  <View className="flex-1" />
                ) : null }
              </View>
            )}
            numColumns={2}
            contentContainerClassName="px-4 gap-4"
            columnWrapperClassName="gap-4"
            className="pt-[20]"
            contentInsetAdjustmentBehavior="automatic"
          />
        </LinearGradient>
      </View>
    </>
  );
}
