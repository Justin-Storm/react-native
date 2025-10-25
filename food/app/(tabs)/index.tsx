import { colors } from '@/constants/colors';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity, Image, Keyboard, Alert, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useUser } from '@/lib/UserContext';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import BottomSheet, { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { databases } from '@/lib/appwriteConfig';
import { router } from 'expo-router';
import { AnimateStyle } from 'react-native-reanimated';

/*const locations = [
  {
    id: '1',
    title: 'Chick-fil-A Freehold',
    description: 'Fast food restaurant',
    latitude: 40.22521,
    longitude: -74.26895,
  },
];*/

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371e3; // Earth radius in meters
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c) * 0.000621371;
}



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
  const snapPointsInner = useMemo(() => [(0.15 * layout.height), (layout.height - (0.12 * layout.height))], []);
  const [innerSheetHeight, setInnerSheetHeight] = useState(0);
  const [locations, setLocations] = useState<any>([]);
  //const [selectedLocation, setSelectedLocation] = useState({});
  const [recommendedLocation, setRecommendedLocation] = useState({});

  useEffect(() => {
    if (!location || locations.length === 0) return;

    const userLat = location.coords.latitude;
    const userLon = location.coords.longitude;

    let closest = locations[0];
    let minDistance = getDistance(userLat, userLon, closest.latitude, closest.longitude);

    for (let i = 1; i < locations.length; i++) {
      const dist = getDistance(userLat, userLon, locations[i].latitude, locations[i].longitude);
      if (dist < minDistance) {
        closest = locations[i];
        minDistance = dist;
      }
    }

    setRecommendedLocation({
      address: closest.address,
      state: closest.state,
      zip: closest.zip,
      id: closest.$id,
    });
  }, [location, locations]);


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

    fetchLocations();
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
      {!user ? (
        <React.Fragment>
          <Text className='font-semibold'>Lets get you to a chick-fil-A®</Text>
          <Text className='w-[80%]'>Check out our locations to order drive-thru, carry-out, curbside or dine-in.</Text>
          <TouchableOpacity className='bg-red-600 rounded-full p-4 w-full items-center' onPress={openBottomSheet}>
            <Text className='text-white'>Start pickup order</Text>
          </TouchableOpacity>
        </React.Fragment>
      ) : (
        <Text>Hello</Text>
      )}
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

  return (
    <View className='flex-1' style={{ paddingTop: insets.top, backgroundColor: colors.lightbg }}>

      <Image
        source={require('@/assets/images/app-images/background.jpeg')}
        style={{ objectFit: 'cover', height: '100%', width: '100%', position: 'absolute' }}
      />

      <View className='px-3'>
        <Text className='text-xl font-bold capitalize' style={{ color: colors.primary }}>{user ? `Welcome, ${user.name}` : 'Welcome'}</Text>
        <Text className='text-3xl font-bold' style={{ color: colors.primary }}>Enjoy the best sandwich</Text>
        {/*{user && !selectedLocation && (
          <View className='mt-3'>
            <Text className='font-bold text-md' style={{ color: colors.primary }}>Recommended Location:</Text>
            <Text className='font-bold text-lg' style={{ color: colors.primary }}>{recommendedLocation.address}, {recommendedLocation.state} {recommendedLocation.zip}</Text>
          </View>
        )}}*/}
      </View>

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

      <BottomSheetModal
        ref={bottomSheetModalRef}
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
            style={{ width: '100%', height: (layout.height * (1 - 0.12)) - (0.15 * layout.height) }}
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
            showsPointsOfInterest={true}
            zoomControlEnabled
          >
            {locations.map((location: { $id: any; latitude: any; longitude: any; zip: any; address: any; state: any }) => (
              <Marker
                key={location.$id}
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title={`${location.address}, ${location.state} ${location.zip}`}
                onPress={() => null}
              >
                <Ionicons name="location-sharp" size={34} color={colors.primary} />
              </Marker>
            ))}
          </MapView>
          <BottomSheet
            ref={innerBottomSheetRef}
            snapPoints={snapPointsInner}
            index={0}
            handleComponent={null}
            enablePanDownToClose={false}
            enableOverDrag={false}
          >
            <BottomSheetView 
              className='flex-1 p-5 gap-7'
              style={{ backgroundColor: colors.lightbg }}
            >
              {locations.map((location: { $id: string; latitude: number; longitude: number; zip: string; address: string; state: string; title: string; city: string; driveThru: boolean; carryOut: boolean; curbside: boolean; dineIn: boolean; })=> (
                <View
                  key={location.$id}
                  className='flex flex-row justify-between items-center'
                >
                  <View>
                    <Text className='font-bold text-md'>{location.title}</Text>
                    <Text className='text-sm'>{location.address}, {location.city} {location.state}</Text>
                    {/*<Text>{location.state} {location.zip}</Text>*/}
                  </View>
                  <TouchableOpacity 
                    className='p-5 rounded-full' 
                    style={{ backgroundColor: colors.primary }} 
                    onPress={() => {
                      router.push({ 
                        pathname: `../subpages/[pickupType]`,
                        params: { 
                          location: location.title, 
                          id: location.$id,
                          driveThru: location.driveThru ? 'true' : 'false',
                          carryOut: location.carryOut ? 'true' : 'false',
                          curbside: location.curbside ? 'true' : 'false',
                          dineIn: location.dineIn ? 'true' : 'false',
                        }});
                      closeBottomSheet();
                    }}
                  >
                    <Text className='text-white font-bold'>Start my order</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </BottomSheetView>
          </BottomSheet>
        </BottomSheetView>
      </BottomSheetModal>

    </View>
  );
};