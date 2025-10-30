import { View, Text, TouchableOpacity, useColorScheme, Image, Alert } from 'react-native'
import React from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Styles from '@/app/styles';
import { SymbolView } from 'expo-symbols';
import { Ionicons } from '@expo/vector-icons';

export default function Post({ id }: any) {
    const post = useQuery(api.content.getPost, { id });
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const styles = Styles(colorScheme);
    const deletePost = useMutation(api.content.deletePost);
    const toggleLike = useMutation(api.content.toggleLikes);
    const user = useQuery(api.user.currentUser);
    const likes = post?.likes;

    function formatNumber(value: number) {
      if (value >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
      } else if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
      } else if (value >= 1_000) {
        return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
      } else {
        return value.toString();
      }
    }

    
    const handleToggleLike = async () => {
      try { 
        await toggleLike({ id, userID: user?._id! });
      } catch (error) {
        Alert.alert("Error", "Failed to toggle like");
      }
    }; 
    
    const bottom = [
      {
        text: "Likes",
        value: formatNumber(likes?.length ?? 0),
        icon: "heart-outline",
        onPress: handleToggleLike,
      },
      {
        text: "Comments",
        value: formatNumber(0),
        icon: "chatbubble-outline",
        onPress: () => {}
      },
      {
        text: "Shares",
        value: formatNumber(0),
        icon: "paper-plane-outline",
        onPress: () => {}
      },
    ];

    const handleDeletePost = async () => {
      try {
        await deletePost({ id });
      } catch (error) {
        Alert.alert("Error", "Failed to delete post");
      }
    }

    return (
        <View className="gap-3 mb-10">
        
            <View className='flex-row justify-between px-3'>

              <View className="flex-row items-center gap-2">
                <TouchableOpacity className='w-[40] aspect-[1] rounded-full bg-blue-400'>
                  {/* image */}
                </TouchableOpacity>
                <View>
                  <TouchableOpacity>
                    <Text className="font-bold text-lg" style={styles.text}>{post?.username}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className='flex-row gap-3 items-center'>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-horizontal" size={24} style={styles.text} />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleDeletePost}>
                  <Ionicons name="trash" size={24} color={'#ff0000'} />
                </TouchableOpacity>
              </View>

            </View>
        
            <Image 
              source={{ uri: "https://greggvanourek.com/wp-content/uploads/2023/08/Nature-path-by-water-trees-and-mountains-AdobeStock_291242770-scaled.jpeg" }}
              style={{ aspectRatio: 2/3 }}
            />

            <View className='flex-row justify-between px-3'>
              <View className='flex-row gap-3'>
                <View className='flex-row gap-2 items-center'>
                  <TouchableOpacity onPress={handleToggleLike}>
                    <Ionicons 
                    name={likes?.includes(user?._id!) ? 'heart' : 'heart-outline' as any} 
                    size={28}
                    color={likes?.includes(user?._id!) ? '#ff0000' : isDark ? '#fff' : '#000'} 
                  />
                  </TouchableOpacity>
                  <Text className='font-bold' style={styles.text}>{likes?.length! > 0 ? likes?.length : ""}</Text>
                </View>
                <View className='flex-row gap-2 items-center'>
                  <TouchableOpacity onPress={() => {}}>
                    <Ionicons 
                    name={'chatbubble-outline'} 
                    size={28}
                    style={styles.text}
                  />
                  </TouchableOpacity>
                  <Text className='font-bold' style={styles.text}>{0 > 0 ? 0 : ""}</Text>
                </View>
                <View className='flex-row gap-2 items-center'>
                  <TouchableOpacity onPress={() => {}}>
                    <Ionicons 
                    name={'paper-plane-outline'} 
                    size={28}
                    style={styles.text}
                  />
                  </TouchableOpacity>
                  <Text className='font-bold' style={styles.text}>{0 > 0 ? 0 : ""}</Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => {}}>
                <Ionicons 
                  name={'bookmark-outline'} 
                  size={28}
                  style={styles.text}
                />
              </TouchableOpacity>
            </View>

            <View className='px-3'>
              <Text style={styles.text}>{post?.description}</Text>
            </View>
        
          </View>
    )
}