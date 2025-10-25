import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { useEffect, useMemo, useRef, useState } from "react";
import { databases, storage } from "@/lib/appwriteConfig";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCart } from "@/lib/CartContext";

export default function MenuCategory() {
    const { category } = useLocalSearchParams(); 
    const insets = useSafeAreaInsets();
    const [menuItems, setMenuItems] = useState<any>([]);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['100%'], []);
    const [selectedItem, setSelectedItem] = useState<any>({});
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchMenuItems = async () => {
            const response = await databases.listDocuments(
                process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
                process.env.EXPO_PUBLIC_APPWRITE_MENU_ITEMS_ID!,
            );
            const publishedItems = response.documents.filter(doc => doc.published === true);

            if (category === 'Entrées') {
                setMenuItems(publishedItems.filter(doc => doc.category === 'entrees'));
            } else if (category === 'Salads') {
                setMenuItems(publishedItems.filter(doc => doc.category === 'salads'));
            } else if (category === 'Sides') {
                setMenuItems(publishedItems.filter(doc => doc.category === 'sides'));
            } else if (category === "Kid's Meals") {
                setMenuItems(publishedItems.filter(doc => doc.category === 'kids-meals'));
            } else if (category === 'Beverages') {
                setMenuItems(publishedItems.filter(doc => doc.category === 'beverages'));
            } else if (category === 'Treats') {
                setMenuItems(publishedItems.filter(doc => doc.category === 'treats'));
            }
        };
        fetchMenuItems();
    }, []);

    const handleOpenBottomSheet = (item: any) => {
        bottomSheetRef.current?.expand();
        setSelectedItem(item);
    };

    const handleCloseBottomSheet = () => {
        bottomSheetRef.current?.close();
        setSelectedItem({});
    };

    return (
        <View className="flex-1">
            <View className='px-3 w-full bg-gray-200' style={{ paddingTop: insets.top, height: 100 }}>
                <View className='items-center w-full flex-1'>
                    <TouchableOpacity 
                        className='absolute left-0'
                        onPress={() => router.back()}
                    >
                        <Ionicons name="chevron-back" size={30} color={colors.black} />
                    </TouchableOpacity>
                    <Text className="font-bold text-xl mt-1">{category}</Text>
                </View>
            </View>

            <ScrollView>
                {menuItems.map((item: { $id: string; name: string; registered: boolean; "image_id": string; }) => (
                    <TouchableOpacity 
                        key={item.$id} 
                        className='px-6 flex-row justify-between items-center'
                        onPress={() => handleOpenBottomSheet(item)}
                    >
                        <View className="flex flex-row gap-2 items-center">
                            <Image
                                source={{ uri: storage.getFileView(process.env.EXPO_PUBLIC_APPWRITE_IMAGES_BUCKET_ID!, item["image_id"]).toString() }} 
                                alt='...'
                                style={{ height: 135, width: 135 }}
                                resizeMode="cover" 
                            />
                            <View>
                                {item.registered &&  <Text className='text-sm'>Chick-fil-A®</Text>}
                                <Text className='text-lg font-semibold'>{item.name}</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={22} color={colors.primary} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            
            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                handleComponent={null}
                enablePanDownToClose
                index={-1}
                onClose={handleCloseBottomSheet}
            >
                <BottomSheetView 
                    className='flex-1 relative'
                    style={{ paddingTop: insets.top}}
                >
                    <TouchableOpacity
                        onPress={handleCloseBottomSheet}
                        className='left-5'
                    >
                        <Ionicons name="close" size={30} color={colors.black} />
                    </TouchableOpacity>
                    {selectedItem && selectedItem["image_id"] && (
                        <Image 
                            source={{ uri: storage.getFileView(process.env.EXPO_PUBLIC_APPWRITE_IMAGES_BUCKET_ID!, selectedItem["image_id"]).toString() }} 
                           style={{ height: 300, width: '100%' }}
                        />
                    )}
                    <View className="flex-col items-center px-5">
                        {selectedItem.registered && (
                            <Text className='text-3xl'>Chick-fil-A®</Text>
                        )}
                        <Text className="text-3xl">{selectedItem.name}</Text>
                        <View className="flex flex-row gap-3 items-center">
                            <Text>${selectedItem.price}</Text>
                            <View className="h-[65%] bg-gray-600 w-[1px]" />
                            <Text>{selectedItem.calories} cal</Text>
                        </View>
                        <View className="flex-column w-full mt-10">
                            <Text className="font-bold">Your selected item contains:</Text>
                            <View className="flex flex-row gap-3 flex-wrap mt-2">
                                {Array.isArray(selectedItem.toppings) && selectedItem.toppings.length > 0 ? (
                                    selectedItem.toppings.map((topping: string, index: number) => (
                                        <View className="flex-column items-center w-14 gap-1" key={index}>
                                            <View className="w-14 h-14 rounded-full bg-blue-300" />
                                            <Text className="capitalize text-center" style={{ fontSize: 10 }}>{topping.replace('_', ' ')}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text className="text-gray-500 italic">No toppings available</Text>
                                )}
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                addToCart({
                                    id: selectedItem.$id,
                                    name: selectedItem.name,
                                    image: storage.getFileView(
                                        process.env.EXPO_PUBLIC_APPWRITE_IMAGES_BUCKET_ID!,
                                        selectedItem.image_id
                                    ).toString(),
                                    quantity: 1,
                                });
                                handleCloseBottomSheet();
                            }}      
                            className="bg-red-600 p-6 rounded-full w-full items-center"
                        >
                            <Text className="text-white">Add to cart</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
};