import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from '@expo/vector-icons/Ionicons'
import { router } from 'expo-router'

const VerticalCarCard = ({ car }) => {
  return (
    <View>
        {car.make !== 'test' &&
            <TouchableOpacity 
              className="rounded-xl bg-slate-300 overflow-hidden" 
              style={{ aspectRatio: 9/11 }}
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
                source={{ uri: car.image }}
                className='w-full aspect-video p-2 rounded-lg'
              />
              <View className='flex-1 justify-between p-3'>
                <Text className='font-bold text-black'>{car.year}</Text>
                <Text className='font-bold text-black'>{car.make.charAt(0).toUpperCase() + car.make.slice(1, car.make.length)}</Text>
                <Text className='font-bold text-black'>{car.model}</Text>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="star" size={14} color={'yellow'} />
                  <Text className="text-black font-bold">{car.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
        }
    </View>
  )
}

export default VerticalCarCard;