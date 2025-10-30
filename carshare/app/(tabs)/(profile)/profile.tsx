import { View, Text, useColorScheme, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { router, Stack } from 'expo-router';
import Styles from '@/app/styles';
import { Ionicons } from '@expo/vector-icons';
import { useAuthActions } from '@convex-dev/auth/react';
import AddButton from '@/components/AddButton';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import * as ImagePicker from 'expo-image-picker';

export default function Profile() {
    const colorScheme = useColorScheme();
    const styles = Styles(colorScheme);
    const { signOut } = useAuthActions();

    const user = useQuery(api.user.currentUser);
    const appUser = useQuery(api.user.getAppUser, { userID: user?._id! });

    // Mutations
    const generateUploadUrl = useMutation(api.user.generateUploadUrl);
    const updateProfilePicture = useMutation(api.user.updateProfilePicture);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        });

        if (result.canceled || !result.assets?.[0]?.uri) return;

        try {
        const uploadUrl = await generateUploadUrl();
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        const upload = await fetch(uploadUrl, {
            method: 'POST',
            headers: { 'Content-Type': blob.type },
            body: blob,
        });
        const { storageId } = await upload.json();
        await updateProfilePicture({ storageId });
        Alert.alert('✅ Success', 'Profile picture updated!');
        } catch (err) {
        console.error(err);
        Alert.alert('Error', 'Failed to upload profile picture');
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerLargeTitle: true,
                    headerTitle: 'Profile',
                    headerTitleStyle: styles.text,
                    headerTransparent: true,
                    headerLeft: () => <AddButton />,
                    headerRight: () => (
                        <TouchableOpacity 
                            className='w-[35] aspect-[1] items-center justify-center'
                            onPress={() => router.push('/profileSettings')}
                        >
                            <Ionicons name='settings-outline' style={styles.text} size={25} />
                        </TouchableOpacity>
                    )
                }}
            />
            <View className="flex-1">
                <ScrollView style={styles.background} contentInsetAdjustmentBehavior="automatic">
                    <View className="px-4 mt-[20]">
                        <View className="gap-2 items-center">
                            <TouchableOpacity onPress={pickImage}>
                                <View className="w-[135] aspect-[1] rounded-full overflow-hidden">
                                    <Image
                                        source={{
                                        uri:
                                            appUser?.profilePicture
                                            ? appUser.profilePicture
                                            : 'https://via.placeholder.com/135',
                                        }}
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.text} className="font-bold text-2xl">
                                @{appUser?.username}
                            </Text>
                        </View>

                        <TouchableOpacity
                            className="flex-row items-center gap-2 p-4 bg-red-500/10 rounded-2xl"
                            onPress={signOut}
                        >
                            <Ionicons name="log-out-outline" color={'#ff0000'} size={30} />
                            <Text className="text-[#ff0000] font-bold text-xl">Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </>
    );
}
