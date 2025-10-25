import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Todo from '@/components/todo';
import { userID } from '@/components/userID'

export default function Search() {
    const todos = useQuery(api.todos.getTodos, { userID: userID });
    const [searchText, setSearchText] = useState("");

    const filteredTodos = todos?.filter((todo: any) =>
        todo.title.toLowerCase().includes(searchText.toLowerCase()) ||
        (todo.note && todo.note.toLowerCase().includes(searchText.toLowerCase()))
    ) || [];

    const [editingTodoIndex, setEditingTodoIndex] = useState<number | null>(null);

    const handleEditTodo = (index: number) => {
        setEditingTodoIndex(index);
    };

    return (
        <>
            <Stack.Screen 
                options={{
                    headerTitle: 'Search',
                    headerTransparent: true,
                    headerSearchBarOptions: {
                        placement: 'automatic',
                        placeholder: 'Search',
                        onChangeText: (event) => {
                            setSearchText(event.nativeEvent.text);
                        }
                    }
                }}
            />
            <View className='flex-1 px-4'>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    {filteredTodos.length > 0 ? (
                        <View className='gap-4'>
                            {filteredTodos.map((todo, index) => (
                                <Todo 
                                    todo={todo} 
                                    key={index} 
                                    onEdit={() => handleEditTodo(index)} 
                                    isEditing={editingTodoIndex === index}  
                                    onCancel={() => setEditingTodoIndex(null)}
                                />
                            ))}
                        </View>
                    ) : (
                        null
                    )}
                </ScrollView>
            </View>
        </>
    )
}