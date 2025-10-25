import { View, Text, ScrollView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'; 
import { useLists } from '@/contexts/ListContext';

const sections = [
    {color: 'yellow', icon: 'sunny-outline', title: 'My Day', onPress: () => null},
    {color: 'pink', icon: 'star-outline', title: 'Important', onPress: () => null},
    {color: 'teal', icon: 'calendar-outline', title: 'Planned', onPress: () => null},
    {color: 'teal', icon: 'person-outline', title: 'Assigned to me', onPress: () => null},
    {color: 'purple', icon: 'checkbox-outline', title: 'Assigned to me', onPress: () => null},
];

export default function SecondPage() {
    const { lists, addList, updateList, removeList, addUntitledList } = useLists();
    const insets = useSafeAreaInsets();

    const handleAddList = () => {
        router.push({ pathname: '../newlist/[id]', params: { title: '', color: 'limegreen' } });
    }

    const createNewList = () => {
        const newListName = addUntitledList();
        router.push({ pathname: "../newlist/[id]", params: { id: newListName, title: newListName } });
    };

    const handleNavigateToList = (id: string, title: string, color: string) => {
        router.push({ pathname: '../newlist/[id]', params: { id, title: title, color } });
    };

    return (
        <View className="flex-1 px-3 bg-black" style={{ paddingTop: insets.top }}>
            <StatusBar barStyle="light-content" />

            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-3">
                    <View className="h-10 w-10 rounded-full bg-slate-400" />
                    <Text className="text-white font-bold text-lg">Justin Storm</Text>
                </View>
                <Ionicons name='search' size={24} color={'#fff'} />
            </View>

            <View 
                className="flex-row px-2 items-center justify-between absolute left-0 bottom-5 w-full" 
                style={{ zIndex: 1 }}
            >
                <TouchableOpacity onPress={createNewList}>
                    <View className="flex-row gap-3 items-center">
                        <Ionicons name='add' size={30} color={'#888'} />
                        <Text className="text-[#888] font-bold text-xl">New List</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View className="flex-row gap-3 items-center">
                        <Ionicons name='albums-outline' size={30} color={'#888'} />
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView>
                {sections.map((section, index) => (
                    <TouchableOpacity key={index}>
                        <View className="flex-row items-center py-4 gap-5">
                            <View className="h-10 w-10 items-center justify-center">
                                <Ionicons name={section.icon} size={24} color={section.color} />
                            </View>
                            <Text className="text-white font-semibold text-xl">{section.title}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                {Object.entries(lists).map(([key, list]) => (
                    <TouchableOpacity key={key} onPress={() => handleNavigateToList(key, list.title, list.color)}>
                        <View className="flex-row items-center p-3 gap-4 justify-between">
                            <Text className="text-white font-semibold text-lg" style={{ color: list.color }}>
                                {list.title || key}
                            </Text>
                            <View className="flex-row items-center gap-2">
                                <Text style={{ color: list.color }}>{Object.keys(list.tasks || {}).length}</Text>
                                <Text style={{ color: list.color }}>-</Text>
                                <Text style={{ color: list.color }}>
                                    {(() => {
                                        const tasks = list.tasks || {};
                                        const total = Object.keys(tasks).length;
                                        const completed = Object.values(tasks).filter(task => task.completed).length;
                                        return total > 0 ? `${Math.round((completed / total) * 100)}%` : '0%';
                                    })()}
                                </Text>
                                <Ionicons name="chevron-forward" size={24} color={'#777'} />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};