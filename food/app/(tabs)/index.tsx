import { colors } from '@/constants/colors';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity, Button, Image, Keyboard, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CustomButton from '../../components/CustomButton';
import { useUser } from '@/lib/UserContext';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import BottomSheet, { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { databases } from '@/lib/appwriteConfig';

/*const locations = [
  {
    id: '1',
    title: 'Chick-fil-A Freehold',
    description: 'Fast food restaurant',
    latitude: 40.22521,
    longitude: -74.26895,
  },
];*/


export default function Index() {
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Pickup' },
    { key: 'second', title: 'Delivery' },
  ]);
  const { user, isLoading } = useUser();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const mapRef = useRef<MapView>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['100%'], []);
  const innerBottomSheetRef = useRef<BottomSheet>(null);
  const snapPointsInner = useMemo(() => ['15%', layout.height - (layout.height * 0.12)], []);
  const [innerSheetHeight, setInnerSheetHeight] = useState(0);
  const [locations, setLocations] = useState<any>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await databases.listDocuments(
          process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.EXPO_PUBLIC_APPWRITE_LOCATIONS_ID!,
        );
        setLocations(response.documents);
      } catch (error) {
        Alert.alert("Error", String(error));
      }
    };
  }, []);

  
  
  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  
  const closeBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.close();
    Keyboard.dismiss();
  }, []);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      
      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    })();
  }, []);
  
  const FirstRoute = () => (
    <View className='p-4 flex-1 justify-between'>
      <Text className='font-semibold'>Lets get you to a chick-fil-A®</Text>
      <Text className='w-[80%]'>Check out our locations to order drive-thru, carry-out, curbside or dine-in.</Text>
        <TouchableOpacity className='bg-red-600 rounded-full p-4 w-full items-center' onPress={openBottomSheet}>
          <Text className='text-white'>Start pickup order</Text>
        </TouchableOpacity>
    </View>
  );
  const SecondRoute = () => (
    <View className='p-4 flex-1 justify-between'>
      <Text className='font-semibold'>Your favorites, right to your door</Text>
      <Text className='w-[80%]'>Order from our select restaurants and delivery patners.</Text>
      <TouchableOpacity className='bg-red-600 rounded-full p-4 w-full items-center' onPress={openBottomSheet}>
          <Text className='text-white'>Start delivery order</Text>
        </TouchableOpacity>
    </View>
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const handleInnerSheetChange = (position: number) => {
    setInnerSheetHeight(position);
    console.log(position);
  };

  return (
    <View className='flex-1' style={{ paddingTop: insets.top, backgroundColor: colors.lightbg }}>

      <Image
        source={require('@/assets/images/app-images/background.jpeg')}
        style={{ objectFit: 'cover', height: '100%', width: '100%', position: 'absolute' }}
      />

      <View className='px-3'>
        <Text className='text-xl font-bold capitalize' style={{ color: colors.primary }}>{user ? `Welcome, ${user.name}` : 'Welcome'}</Text>
        <Text className='text-3xl font-bold' style={{ color: colors.primary }}>Enjoy the best sandwich</Text>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        handleComponent={null}
        enablePanDownToClose={false}
        enableOverDrag={false}
      >
        <BottomSheetView 
          className='flex-1' 
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            overflow: 'hidden',
            backgroundColor: 'white',
          }}
        >
          <View className='px-3 w-full bg-white flex flex-row justify-between pb-3' style={{ paddingTop: insets.top }}>
            <View className='gap-2 flex flex-row flex-1 items-center'>
              <Ionicons name='search' size={28} color={colors.black} />
              <TextInput
                placeholder='City, zip code, address'
                className='flex-1 h-12 px-2 py-1 rounded-xl'
              />
            </View>
            <TouchableOpacity 
              className='items-center justify-center rounded-full bg-white h-12 w-12'
              onPress={closeBottomSheet}
            >
              <Ionicons name='close' size={28} color={colors.black} />
            </TouchableOpacity>
          </View>
          <MapView
            key={innerSheetHeight}
            ref={mapRef}
            style={{ width: '100%', height: layout.height - (0.15 * layout.height) }}
            showsUserLocation={true}
            showsMyLocationButton={true}
            initialRegion={{
              latitude: location?.coords.latitude || 37.78825,
              longitude: location?.coords.longitude || -122.4324,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            mapPadding={{ top: 10, right: 10, bottom: 10, left: 10 }}
            mapType='standard'
            showsPointsOfInterest={false}
          >
            {locations.map(location => (
              <Marker
                key={location.$id}
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title={location.address}
              >
                <Ionicons name="location-sharp" size={34} color={colors.primary} />
              </Marker>
            ))}
            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title={"You are here"}
              />
            )}
          </MapView>
          <BottomSheet
            ref={innerBottomSheetRef}
            snapPoints={snapPointsInner}
            index={0}
            handleComponent={null}
            enablePanDownToClose={false}
            enableOverDrag={false}
            onAnimate={handleInnerSheetChange}
          >
            <BottomSheetView 
              className='flex-1 p-3 bg-red-400'
            >
              <Text>Hello</Text>
            </BottomSheetView>
          </BottomSheet>
        </BottomSheetView>
      </BottomSheetModal>
      

      <View className='flex-column w-full px-3 pb-3 absolute bottom-[85]'>
        <View className='bg-white flex-1 rounded-2xl overflow-hidden'>
          <TabView
            style={{ height: 200, width: '100%' }}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props => (
              <TabBar 
                {...props} 
                indicatorStyle={{ backgroundColor: 'red' }}
                activeColor='red'
                inactiveColor='#888'
                style={{ backgroundColor: 'transparent' }}
              />
            )}
          />
          <View className='w-full' style={{ height: 1, backgroundColor: colors.grey, opacity: 0.5 }}  />
          <View className='flex-row items-center justify-center gap-2 p-3'>
            <Text className='text-sm'>Feeding a crowd?</Text>
            <TouchableOpacity>
              <Text style={{ color: colors.primary }}>Start a catering order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};