import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { SymbolView } from 'expo-symbols';

export default function Todo({ todo, onEdit, isEditing, onCancel }: { todo: any, onEdit: () => void, isEditing: boolean, onCancel: () => void }) {
    const toggleTodo = useMutation(api.todos.toggleTodo);
    const deleteTodo = useMutation(api.todos.deleteTodo);
    const updateTodo = useMutation(api.todos.updateTodo);
    const [newTitle, setNewTitle] = useState(todo.title);
    const [newNote, setNewNote] = useState(todo.note);

    const handleToggleTodo = async (id: any) => {
        try {
            await toggleTodo({ id });
        } catch (error) {
            Alert.alert("Error", "Failed to toggle todo.");
        }
    };
    
    const handleDeleteTodo = async (id: any) => {
        try {
            await deleteTodo({ id });
        } catch (error) {
            Alert.alert("Error", "Failed to delete todo.");
        }
    };

    const handleSaveUpdate = async (id: any) => {
        if (newTitle.trim() === "") {
            Alert.alert("Validation Error", "Title is required.");
            return;
        }
        try {
            await updateTodo({ id, title: newTitle.trim(), note: newNote.trim() });
            onCancel();
        } catch (error) {
            Alert.alert("Error", "Failed to update todo.");
        }
    };

    return (
        <View className="flex-column p-4 rounded-xl bg-slate-100 border border-slate-300 rounded-[35]">
            
            <View className='flex-row items-center justify-between flex-1 gap-5'>
                
                <View className='flex-row gap-4 items-center flex-1'>
                    <TouchableOpacity onPress={() => handleToggleTodo(todo._id)}>
                        <Ionicons name={todo.isCompleted ? 'checkmark-circle' : 'ellipse-outline'} size={35} color={todo.isCompleted ? 'green' : 'gray'} />
                    </TouchableOpacity>
                    {!isEditing && <Text className="text-xl font-bold flex-1" numberOfLines={1}>{todo.title}</Text> }
                    {isEditing &&
                        <View className='gap-3 flex-1'>
                            <TextInput 
                                value={newTitle}
                                onChangeText={setNewTitle}
                                placeholder='Title'
                                placeholderTextColor={'#999'}
                                className='flex-1 border-b border-black p-3'
                            />
                            <TextInput 
                                value={newNote}
                                onChangeText={setNewNote}
                                placeholder='Note'
                                placeholderTextColor={'#999'}
                                className='flex-1 border-b border-black p-3'
                            />
                        </View>
                    }
                </View>

                {!isEditing && 
                    <View className='flex-row gap-3'>
                        <TouchableOpacity onPress={onEdit}>
                            <SymbolView name="square.and.pencil" size={30} tintColor={'#ffa500'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeleteTodo(todo._id)}>
                            <SymbolView name="trash" size={30} tintColor={'#ff0000'} />
                        </TouchableOpacity>
                    </View>
                }

            </View>

            {todo.note && !isEditing ? <Text className="text-slate-600 ms-[50]">{todo.note}</Text> : null}
            {isEditing &&
                <View className='flex-row gap-3 ms-[50] mt-4'>
                    <TouchableOpacity className='p-3 gap-2 flex-row items-center bg-green-500 rounded-full' onPress={() => handleSaveUpdate(todo._id)}>
                        <SymbolView name='checkmark' tintColor={'#fff'} size={18} />
                        <Text className='text-white'>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='p-3 gap-2 flex-row items-center bg-gray-300 rounded-full' onPress={onCancel}>
                        <SymbolView name='xmark' tintColor={'#fff'} size={18} />
                        <Text className='text-white'>Cancel</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}