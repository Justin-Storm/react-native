import { carData } from '@/constants/data';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
    const userName = 'Justin';

    return (
        <SafeAreaView>
            <View className='items-center'>
                <View className='relative h-48 w-48 rounded-full bg-red-300'>
                    <View className='absolute right-4 bottom-1 w-12 h-12 rounded-full items-center justify-center bg-blue-300'>
                        <Ionicons name='add' size={32} color={'#fff'} />
                    </View>
                </View>
                <Text className='font-bold text-black text-2xl'>{userName}</Text>
            </View>
        </SafeAreaView>
    )
}

export default Profile;