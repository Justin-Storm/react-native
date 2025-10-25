import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ImageSourcePropType } from 'react-native';
import { notSignedInData } from '@/constants/data';
import { windowHeight } from '@/constants/dimensions';
import { useRouter } from 'expo-router';

type Props = {
  title: string;
  description: string;
  image: ImageSourcePropType;
};

export default function NotLoggedInScreen(props: Props) {
    const router = useRouter();

    return (
         <React.Fragment>
            <View className="w-full relative items-center overflow-hidden bg-slate-300" style={{ height: windowHeight * 0.45}}>
                <Text className="text-center text-white w-[65%] font-semibold text-3xl top-[35] absolute shadow-md" style={{ zIndex: 1 }}>{props.title}</Text>
                <Image
                    source={props.image}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                />
            </View>
            <View className="px-3 py-6 w-full items-center">
                <Text className="text-center">{props.description}</Text>
            </View>
            <View className="px-3 absolute bottom-[95] w-full">
                <TouchableOpacity 
                    className="w-full h-14 rounded-full bg-red-600 items-center justify-center"
                    onPress={() => router.push('/auth/sign-in')}
                >
                    <Text className="text-white">Sign in to create a Chick-fil-A One Account</Text>
                </TouchableOpacity>                
            </View>
        </React.Fragment>
    );
};