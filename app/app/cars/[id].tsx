import { View, Text, Image, TouchableOpacity, ScrollView, Platform, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { router, useGlobalSearchParams, useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ColorProperties } from 'react-native-reanimated/lib/typescript/Colors';
import { carData, featuredCarData, listForStars } from '@/constants/data';
import CarCard from '@/components/CarCard';

const CarDetails = () => {
    const { 
        carMake, 
        carModel, 
        carYear, 
        carRating, 
        carImage, 
        carTopSpeed, 
        carStartingPrice,
        carHorsePower,
        carTorque,
        carDrivetrain,
        carTransmission,
        carZeroToSixty,
        carFuelType,
        carWeight,
        carColorOptions,
        carDetails,
    } = useGlobalSearchParams();
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const carRatingRounded = Math.round(carRating);
    const widthOfBox = (1/3) * 100;
    const allCars = featuredCarData.concat(carData);

    const selectedCar = allCars.find(car =>
        car.year.toString() === carYear.toString() && car.model === carModel && car.make === carMake
    );

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const carDetailsSection = [
        { icon: 'speedometer-outline', value: `${carTopSpeed} mph` },
        { icon: 'cash-outline', value: `$${Number(carStartingPrice).toLocaleString()}` },
        { icon: 'flash-outline', value: `${carHorsePower} hp` },
        { icon: 'construct-outline', value: `${carTorque} lb-ft` },
        { icon: 'swap-horizontal-outline', value: carDrivetrain },
        { icon: 'settings-outline', value: carTransmission },
        { icon: 'timer-outline', value: `0-60 in ${carZeroToSixty}s` },
        { icon: 'flame-outline', value: carFuelType },
        { icon: 'barbell-outline', value: `${carWeight} lbs` },
      ];

    return (
        <View className='flex-1'>
            <TouchableOpacity 
                className='w-10 h-10 flex-row gap-2 items-center justify-center py-1 rounded-full'
                style={{
                    position: 'absolute',
                    top: insets.top,
                    left: 10,
                    zIndex: 5,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}
                onPress={() => router.back()}
            >
                <Ionicons name='chevron-back' size={26} color={'#fff'} />
            </TouchableOpacity>
            <ScrollView>
                <View className='flex-1 pb-12'>
                    <View className='w-full' style={{ height: 350 }}>
                        <View className='w-full h-full absolute top-0 left-0' style={{ backgroundColor: 'rgba(0, 0, 0, 0.35)', zIndex: 1 }}></View>
                        <Image 
                            source={{ uri: `${carImage}` }} 
                            className='w-full h-full'
                            resizeMode='cover'
                        />
                        <View className='flex-row items-center justify-center gap-2 rounded-full'
                            style={{
                                position: 'absolute',
                                bottom: 15,
                                right: 15,
                                zIndex: 5,
                            }}
                        >
                            {listForStars.map((number, index) => (
                                <Ionicons key={index} name='star' size={14} color={carRatingRounded >= number ? 'yellow' : '#8888'} /> 
                            ))}
                            <Text className='font-bold text-white'>{carRating}</Text>
                        </View>
                    </View>
                    <View className='p-3 gap-10'>
                        <Text className='font-bold text-black text-center' style={{ fontSize: 20 }}>{carYear} {carMake.charAt(0).toUpperCase() + carMake.slice(1, carMake.length)} {carModel}</Text>
                        
                        <View className='flex-row flex-wrap gap-y-4 justify-center w-full'>

                            {carDetailsSection.map((item, index) => (
                                <View
                                    key={index}
                                    className='p-3 items-center'
                                    style={{ width: `${widthOfBox}%` }}
                                >
                                    <Ionicons name={item.icon} size={32} color={'#000'} />
                                    <Text className='font-bold text-black text-center'>{item.value}</Text>
                                </View>
                            ))}
                        </View>

                        <View className='w-[90%] mx-auto rounded-full h-0.5 bg-slate-300'></View>

                        <View className='gap-24'>
                            <View className='gap-2 items-center flex-1'>
                                <View className='flex-row items-center gap-2 justify-center'>
                                    <Ionicons name='color-palette-outline' size={32} color={'#000'} />
                                    <Text className='font-bold'>Colors: </Text>
                                </View>
                                <View className='flex-row flex-wrap flex-1 gap-4'>
                                    <View>
                                        <View className='flex-row flex-wrap justify-center gap-6'>
                                            {selectedCar?.colorOptions?.map((color, colorIndex) => (
                                                <View className='gap-1' key={colorIndex}>
                                                    <View className='border h-12 p-3 rounded-full items-center' style={{ backgroundColor: color.colorCode }}></View>
                                                    <Text className='font-bold text-black'>{color.name}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View className='flex-row gap-2'>
                                <Ionicons name={'information-circle-outline'} size={32} color={'#000'} />
                                <Text className='font-bold flex-1'>{carDetails}</Text>
                            </View>
                        </View>
                        
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default CarDetails