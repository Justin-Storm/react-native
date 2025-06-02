import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'

const CarCard = ({ car }) => {
  return (
    <View>
        {car.make !== 'test' &&
            <TouchableOpacity 
                className="rounded-xl overflow-hidden" 
                style={{ aspectRatio: 16/9 }}
                onPress={() => router.push({ 
                    pathname: '/cars/[id]',
                    params: {
                        carMake: car.make, 
                        carModel: car.model, 
                        carYear: car.year, 
                        carRating: car.rating, 
                        carImage: car.image,
                        carTopSpeed: car.topSpeed,
                        carStartingPrice: car.startingPrice,
                        carHorsePower: car.horsepower,
                        carTorque: car.torque,
                        carDrivetrain: car.drivetrain,
                        carTransmission: car.transmission,
                        carZeroToSixty: car.zeroToSixty,
                        carFuelType: car.fuelType,
                        carWeight: car.weight,
                        carColorOptions: car.colorOptions,
                        carDetails: car.details,
                    }
                })}    
            >
                <Image 
                    className="absolute top-0 left-0" 
                    source={{ uri: car.image }} 
                    alt='image'
                    style={{
                    width: '100%',
                    height: '100%'
                    }}
                />
                <LinearGradient
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    colors={['transparent', 'rgba(0, 0, 0, 0.5)']}
                    className="h-full w-full"
                >
                    <View className="w-full h-full p-4 justify-end">
                    <Text className="font-bold text-md text-white" numberOfLines={1}>{car.year} {car.make.charAt(0).toUpperCase() + car.make.slice(1, car.make.length)} {car.model}</Text>
                    <View className="flex-row p-2 items-center justify-center gap-1 absolute top-2 right-2 rounded-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <Ionicons name="star" size={14} color={'yellow'} />
                        <Text className="text-white font-bold">{car.rating}</Text>
                    </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        }
    </View>
  )
}

export default CarCard;