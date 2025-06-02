import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { primary } from "@/constants/Colors";
import { toDoItems as initialItems, taskDetailsColors } from "@/constants/data";
import { Swipeable } from "react-native-gesture-handler";
import MaskedView from "@react-native-masked-view/masked-view";
import { IconSymbol } from "@/components/IconSymbol.ios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

export default function Index() {
  const insets = useSafeAreaInsets();
  const [lists, setLists] = useState<{ [key: string]: string[] }>(initialItems);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [newItemText, setNewItemText] = useState<{ [category: string]: string }>({});
  const [collapsed, setCollapsed] = useState<{ [category: string]: boolean }>({});

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['100%'], []);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTaskDetailColor, setSelectedTaskDetailColor] = useState<string | null>(null);

  const [originalTaskName, setOriginalTaskName] = useState<string | null>(null);
  const [taskColors, setTaskColors] = useState<{ [key: string]: string }>({});


  const getItemKey = (category: string, item: string) => `${category}:${item}`;

  const toggleCompletion = (category: string, item: string) => {
    const key = getItemKey(category, item);
    setCompleted((prev) => {
      const newSet = new Set(prev);
      newSet.has(key) ? newSet.delete(key) : newSet.add(key);
      return newSet;
    });
  };

  const handleAddItem = (category: string) => {
    const text = newItemText[category]?.trim();
    if (!text) return;

    const existingItems = lists[category] || [];
    const isDuplicate = existingItems.some(
      (item) => item.toLowerCase() === text.toLowerCase()
    );
    if (isDuplicate) return Alert.alert("Error", `No duplicate items in the ${category} list`);

    setLists((prev) => ({
      ...prev,
      [category]: [...existingItems, text],
    }));

    setNewItemText((prev) => ({
      ...prev,
      [category]: "",
    }));
  };

  const handleDelete = (category: string, item: string) => {
    const itemKey = getItemKey(category, item);

    setLists((prev) => ({
      ...prev,
      [category]: prev[category].filter((i) => i !== item),
    }));

    setCompleted((prev) => {
      const newSet = new Set(prev);
      newSet.delete(itemKey);
      return newSet;
    });

    setTaskColors((prev) => {
      const newColors = { ...prev };
      delete newColors[itemKey];
      return newColors;
    });
  };


  const toggleCollapse = (category: string) => {
    setCollapsed((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const renderRightActions = (category: string, item: string) => (
    <TouchableOpacity
      onPress={() => handleDelete(category, item)}
      className="bg-red-500 w-14 justify-center items-center rounded-r-xl"
    >
      <Ionicons name="trash" size={24} color="white" />
    </TouchableOpacity>
  );

  const showAddCategoryPrompt = () => {
    if (Platform.OS !== "ios") {
      return Alert.alert("Unsupported", "Category prompt only works on iOS.");
    }

    Alert.prompt(
      "New Category",
      "Enter a name for your new category:",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Add",
          onPress: (name) => {
            const trimmed = (name ?? "").trim();
            if (!trimmed) return Alert.alert("Error", "Category name cannot be empty");
            if (lists[trimmed]) return Alert.alert("Error", "Category already exists");

            setLists((prev) => ({
              ...prev,
              [trimmed]: [],
            }));
          },
        },
      ],
      "plain-text"
    );
  };

  const handleDeleteCategory = (category: string) => {
    Alert.alert("Delete Category", `Are you sure you want to delete the "${category}" list?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setLists((prev) => {
            const newLists = { ...prev };
            delete newLists[category];
            return newLists;
          });

          setCompleted((prev) => {
            const newCompleted = new Set([...prev].filter((key) => !key.startsWith(`${category}:`)));
            return newCompleted;
          });

          setNewItemText((prev) => {
            const newText = { ...prev };
            delete newText[category];
            return newText;
          });

          setCollapsed((prev) => {
            const newCollapsed = { ...prev };
            delete newCollapsed[category];
            return newCollapsed;
          });
        },
      },
    ]);
  };

  const openBottomSheet = useCallback((category: string, task: string) => {
    setSelectedCategory(category);
    setSelectedTask(task);
    setOriginalTaskName(task);
    const taskKey = getItemKey(category, task);
    setSelectedTaskDetailColor(taskColors[taskKey] || null); // Load existing color
    bottomSheetModalRef.current?.present();
  }, [taskColors]);


  const closeBottomSheet = useCallback(() => {
    Keyboard.dismiss();
    setSelectedCategory(null);
    setSelectedTask(null);
    bottomSheetModalRef.current?.close();
  }, []);

  const handleTaskEdit = (
    category: string,
    originalTaskName: string,
    updatedTaskName: string
  ) => {
    if (!category || !originalTaskName || !updatedTaskName) return;

    const trimmedName = updatedTaskName.trim();
    if (!trimmedName) {
      Alert.alert("Error", "Task name cannot be empty.");
      return;
    }

    if (
      trimmedName.toLowerCase() !== originalTaskName.toLowerCase() &&
      lists[category].some(
        (item) => item.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      Alert.alert("Error", "This task name already exists in the list.");
      return;
    }

    setLists(prev => {
      const updatedList = prev[category].map(item =>
        item === originalTaskName ? updatedTaskName : item
      );

      return {
        ...prev,
        [category]: updatedList,
      };
    });

    setCompleted(prev => {
      const newSet = new Set(prev);
      const oldKey = getItemKey(category, originalTaskName);
      const newKey = getItemKey(category, updatedTaskName);

      if (newSet.has(oldKey)) {
        newSet.delete(oldKey);
        newSet.add(newKey);
      }

      return newSet;
    });

    setTaskColors(prev => {
      const newColors = { ...prev };
      const oldKey = getItemKey(category, originalTaskName);
      const newKey = getItemKey(category, updatedTaskName);

      if (newColors[oldKey]) {
        newColors[newKey] = newColors[oldKey];
        delete newColors[oldKey];
      }

      if (selectedTaskDetailColor) {
        newColors[newKey] = selectedTaskDetailColor;
      }

      return newColors;
    });

    closeBottomSheet();
    setSelectedTaskDetailColor(null);
  };



  return (
    <View className="flex-1">

      <View className="bg-white px-3 pb-2" style={{ paddingTop: insets.top }}>
        <View className="flex-row items-center h-7 justify-between">
        <TouchableOpacity onPress={showAddCategoryPrompt}>
          <IconSymbol name="plus.circle.fill" size={26} color={primary} />
        </TouchableOpacity>

          <Text 
            className="text-xl font-semibold text-center absolute w-full"
            style={{ pointerEvents: 'none', color: primary }}
          >Home</Text>
        </View>
      </View>

      <ScrollView contentContainerClassName="flex-1 pt-3 px-3 pb-48 gap-10" scrollEnabled={!Object.keys(lists).length ? false : true}>

        {!Object.keys(lists).length &&
          <View className="flex-1 justify-center items-center">
            <MaskedView
              maskElement={
                <IconSymbol name="checkmark.circle.fill" size={125} color="black" />
              }
            >
              <LinearGradient
                colors={['#ff0080', '#0000ff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: 125, height: 125 }}
              />
            </MaskedView>
            <Text className="text-black font-bold text-2xl">No categories available</Text>
          </View>
        }

        {Object.keys(lists).length > 0 && (
          <Text className="text-black font-bold text-3xl">To-Do Lists • {Object.keys(lists).length}</Text>
        )}

        {Object.entries(lists).map(([category, list], index) => {
          const totalCount = list.length;
          const completedCount = list.filter((item) =>
            completed.has(getItemKey(category, item))
          ).length;
          const percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
          const isCollapsed = collapsed[category];

          return (
            <View key={index}>

              <View className="flex-row justify-between items-center">
                <Text className="capitalize font-bold text-xl mb-2">{category}</Text>
                <TouchableOpacity
                  onPress={() => toggleCollapse(category)}
                  className="flex-row gap-3 items-center"
                >
                  <Text
                    className={`${
                      completedCount === totalCount && totalCount !== 0 ? "text-green-500" : ""
                    }`}
                  >
                    {completedCount}/{totalCount} - {percentage}%
                  </Text>
                  <Ionicons
                    name={isCollapsed ? "chevron-up" : "chevron-down"}
                    size={26}
                    color={"#000"}
                  />
                </TouchableOpacity>
              </View>

              <View className={`gap-2 overflow-hidden ${isCollapsed ? "h-0" : ""}`}>
                {list.map((toDo, i) => {
                  const key = getItemKey(category, toDo);
                  const isDone = completed.has(key);
                  return (
                    <TouchableOpacity 
                      key={i} 
                      className="rounded-xl overflow-hidden" 
                      onPress={() => openBottomSheet(category, toDo)}
                    >
                      <Swipeable
                        renderRightActions={() => renderRightActions(category, toDo)}
                        overshootRight={true}
                        overshootFriction={1000}
                      >
                        <View className="flex-row items-center bg-white p-3 gap-2">

                          <View className="flex-row flex-1 items-center gap-2">
                            <TouchableOpacity onPress={() => toggleCompletion(category, toDo)}>
                              <IconSymbol
                                name={isDone ? "checkmark.circle.fill" : "circle"}
                                size={28}
                                color={primary}
                              />
                            </TouchableOpacity>
                            <Text className={`flex-1 ${isDone ? "line-through text-gray-500" : "text-black"}`} numberOfLines={1}>{toDo}</Text>
                          </View>

                          <View className="flex-row gap-2 items-center">
                            <View className="w-2.5 aspect-square rounded-full" style={{ backgroundColor: taskColors[getItemKey(category, toDo)] || 'transparent' }} />
                            <IconSymbol name="chevron.forward" size={18} color={primary} />
                          </View>

                        </View>
                      </Swipeable>
                    </TouchableOpacity>
                  );
                })}

                <View className="flex-row">
                  <View className="flex-row flex-1 items-center bg-white rounded-xl p-3 gap-2">
                    <View>
                      <IconSymbol
                        name={"circle.dotted"}
                        size={28}
                        color={primary}
                        style={{ opacity: 0.75 }}
                      />
                    </View>
                    <TextInput
                      className="flex-1"
                      placeholder="Add new item..."
                      value={newItemText[category] || ""}
                      onChangeText={(text) =>
                        setNewItemText((prev) => ({ ...prev, [category]: text }))
                      }
                    />
                    {newItemText[category]?.trim() ? (
                      <TouchableOpacity onPress={() => handleAddItem(category)}>
                        <Ionicons name="add-circle" size={28} color="limegreen" />
                      </TouchableOpacity>
                    ) : null}
                  </View>

                  <TouchableOpacity
                    onPress={() => handleDeleteCategory(category)}
                    className="bg-red-500 justify-center items-center w-14 rounded-xl ml-2"
                  >
                    <Ionicons name="trash" size={24} color="#fff" />
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          );
        })}

      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        handleComponent={null}
        enablePanDownToClose={false}
        enableOverDrag={false}
      >
        <BottomSheetView className='flex-1 px-6 pb-4' style={{ paddingTop: insets.top }}>

          <TouchableOpacity onPress={closeBottomSheet} className="mb-6">
            <Ionicons name="close" size={28} color={primary} />
          </TouchableOpacity>

          <View className='flex-1 w-full justify-between'>

            <View className="gap-10">
              <TextInput
                className="bg-slate-200 rounded-lg p-3 border border-slate-300"
                value={selectedTask || ""}
                onChangeText={setSelectedTask}
                placeholder={selectedTask ?? ""}
              />

              <View className="flex-row gap-2 justify-between">
                {taskDetailsColors.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => selectedTaskDetailColor === color ? setSelectedTaskDetailColor(null) : setSelectedTaskDetailColor(color) }
                    className="w-12 h-12 rounded-full items-center justify-center"
                    style={{
                      backgroundColor: selectedTaskDetailColor === color ? color : "#fff"
                    }}
                  >
                    <Ionicons
                      name="bookmark"
                      size={20}
                      color={selectedTaskDetailColor === color ? '#fff' : color}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={insets.bottom + 80}
              className="w-full"
            >
              <TouchableOpacity
                className="h-14 w-full bg-blue-400 rounded-lg justify-center items-center mb-6"
                onPress={() => {
                  if (selectedCategory && originalTaskName && selectedTask) {
                    handleTaskEdit(selectedCategory, originalTaskName, selectedTask);
                  }
                }}
              >
                <Text className="font-bold text-white text-xl">Update Task</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>

          </View>
        </BottomSheetView>
      </BottomSheetModal>

    </View>
  );
}
