import { View, Text, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useLists } from '@/contexts/ListContext';
import { BlurView } from 'expo-blur';

const colors = [
  'limegreen',
  'tomato',
  'deepskyblue',
  'gold',
  'violet',
  '#FF6B6B',
  '#4ECDC4',
  '#556270',
  '#C7F464',
  '#FFCC5C',
  '#6B5B95',
  '#88B04B',
  '#F7CAC9',
  '#92A8D1',
];


export default function NewList() {
  const { id, title, color } = useLocalSearchParams();
  const navigation = useNavigation();
  const { updateList, removeList, lists, addTask, updateTask, removeTask } = useLists();
  const [selectedColor, setSelectedColor] = useState(color || 'limegreen');
  const [editableTitle, setEditableTitle] = useState(title || '');

  const handleEditTitle = () => {
    if (Platform.OS === 'ios') {
      Alert.prompt(
        'Edit List Title',
        undefined,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'OK',
            onPress: (newTitle) => {
              if (
                newTitle?.trim().length &&
                !Object.values(lists).some(
                  (list) =>
                    list.title.toLowerCase() === newTitle.trim().toLowerCase()
                )
              ) {
                setEditableTitle(newTitle.trim());
                if (id) updateList(id as string, { title: newTitle.trim() });
              } else {
                Alert.alert(
                  'List name failed to update',
                  'Cannot make the name of a list one that already exists.'
                );
              }
            },
          },
        ],
        'plain-text',
        editableTitle
      );
    } else {
      Alert.alert(
        'Edit List Title',
        'Editing title on Android requires a custom modal implementation.'
      );
    }
  };

  const handleDeleteList = () => {
    Alert.alert('Delete List', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          if (id) {
            removeList(id as string);
            navigation.goBack();
          }
        },
      },
    ]);
  };

  const handleAddTask = () => {
    Alert.prompt(
      'Add New Task',
      'Enter the task title:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add',
          onPress: (taskTitle) => {
            if (taskTitle?.trim()) {
              addTask(id as string, {
                title: taskTitle.trim(),
                completed: false,
                notes: '',
                priority: '',
                favorited: false,
              });
            } else {
              Alert.alert('Error', 'Task title cannot be empty.');
            }
          },
        },
      ],
      'plain-text'
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTintColor: selectedColor,
      headerTitle: editableTitle,
      headerLargeTitle: true,
      headerBackTitle: 'Lists',
      headerTransparent: true,
      headerBlurEffect: 'dark',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View className="flex-row gap-2 items-center">
            <Ionicons name="chevron-back" size={26} color={selectedColor} />
            <Text className="font-bold text-xl" style={{ color: selectedColor }}>
              Lists
            </Text>
          </View>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={handleEditTitle}>
            <Ionicons name="ellipsis-horizontal" size={24} color={selectedColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddTask}>
            <Ionicons name="add" size={24} color={selectedColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteList}>
            <Ionicons name="trash-outline" size={24} color={selectedColor} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [selectedColor, editableTitle, navigation]);

  const handleSelectColor = (newColor: string) => {
    setSelectedColor(newColor);
    if (id) {
      updateList(id as string, { color: newColor });
    }
  };

  const currentList = id ? lists[id as string] : null;
  const tasks = currentList ? Object.entries(currentList.tasks) : [];

  return (
    <View className="flex-1">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: 'black', height: '100%' }}
      >
        <View className="py-4 flex-1">
          <ScrollView 
            horizontal 
            contentContainerClassName="flex-row flex-wrap gap-4 mb-6 px-4"
            showsHorizontalScrollIndicator={false}
          >
            {colors.map((clr) => {
              const isSelected = selectedColor === clr;
              return (
                <TouchableOpacity
                  key={clr}
                  onPress={() => handleSelectColor(clr)}
                  className="rounded-full"
                  activeOpacity={0.8}
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: clr,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: isSelected ? 3 : 0,
                    borderColor: 'white',
                  }}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={24} color="white" />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>


          {tasks.length > 0 ? (
            <View className="gap-3">
              <Text className="text-white text-lg mb-2">Tasks:</Text>
              {tasks.map(([taskId, task]) => (
                <TouchableOpacity key={taskId}>
                  <BlurView intensity={25} className="border border-white/35 overflow-hidden rounded-xl">
                    <View className="p-4 flex-row justify-between items-center">
                      <View className="gap-4 flex-row items-center">
                        <TouchableOpacity
                          onPress={() =>
                            updateTask(id as string, taskId, {
                              completed: !task.completed,
                            })
                          }
                        >
                          <Ionicons
                            name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
                            size={30}
                            color={task.completed ? selectedColor : 'grey'}
                          />
                        </TouchableOpacity>
                        <Text
                          className={`text-base ${
                            task.completed ? 'line-through text-gray-500' : 'text-white'
                          }`}
                        >
                          {task.title}
                        </Text>
                      </View>

                      <View className="flex-row gap-4 items-center">
                        <TouchableOpacity
                          onPress={() =>
                            updateTask(id as string, taskId, {
                              favorited: !task.favorited,
                            })
                          }
                        >
                          <Ionicons
                            name={task.favorited ? 'bookmark' : 'bookmark-outline'}
                            size={25}
                            color={task.favorited ? selectedColor : 'grey'}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() =>
                            Alert.alert(
                              'Delete Task',
                              'Are you sure you want to delete this task?',
                              [
                                { text: 'Cancel', style: 'cancel' },
                                {
                                  text: 'Delete',
                                  style: 'destructive',
                                  onPress: () => removeTask(id as string, taskId),
                                },
                              ]
                            )
                          }
                        >
                          <Ionicons name="trash-outline" size={22} color="red" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </BlurView>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View className="flex-1 items-center justify-center">
              <Ionicons name="checkmark-circle" size={100} color={'limegreen'} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
