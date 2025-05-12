import { carData, featuredCarData } from "@/constants/data";
import { Platform, View, Text, ScrollView, TouchableOpacity, StatusBar, Linking } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useState } from "react";
import CarCard from "@/components/CarCard";
import VerticalCarCard from "@/components/VerticalCarCard";
import { FlatList } from "react-native";
import { Link, router, usePathname } from "expo-router";

export default function Index() {
  const currentYear = new Date().getFullYear();
  const insets = useSafeAreaInsets();

  const handlePhonePress = () => {
    // Use Linking API to trigger the phone call
    Linking.openURL('tel:2015518244');
  };

  return (
      <ScrollView style={{ paddingTop: insets.top }}>
        <StatusBar barStyle={'dark-content'} />

        <TouchableOpacity onPress={handlePhonePress}>
          <Text className="font-bold text-2xl text-blue-500">
            201-551-8244
          </Text>
        </TouchableOpacity>

        <Text className="ml-3 font-bold text-lg text-black mb-1">Featured Cars</Text>
        <View className="h-48">
          <FlatList
            horizontal
            bounces={true}
            showsHorizontalScrollIndicator={false}
            data={featuredCarData}
            keyExtractor={(_item, index) => index.toString()}
            contentContainerClassName="px-3 gap-3"
            renderItem={({ item }) => (
              <View>
                <CarCard car={item} />
              </View>
            )}
          />
        </View>

        <View className="pt-8">
          <View className="flex-row justify-between items-center px-3">
            <Text className="font-bold text-lg text-black mb-1">Cars</Text>
            <Link href="/explore">
              <Text className="font-bold text-md text-blue-500">See All</Text>
            </Link>
          </View>

          <View className="h-full px-3 w-full justify-evenly gap-x-3 gap-y-0.5 flex-wrap flex-row">
            {carData.map((item, index) => (
              <View className="w-[48%] mb-3" key={index}>
                  <VerticalCarCard car={item} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
  );
}
