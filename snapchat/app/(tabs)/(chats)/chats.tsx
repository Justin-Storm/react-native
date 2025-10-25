import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import ScreenHeader from "@/components/ScreenHeader";

type Friend = {
  id: string;
  name: string;
  streak: number;
  status: "new" | "delivered" | "opened";
  snapType: "image" | "video" | "chat";
  timeAgo: number;
};

const initialFriends: Friend[] = [
  { id: "1", name: "Hailey", streak: 15, status: "new", snapType: "image", timeAgo: 120000000 },
  { id: "2", name: "Justin S", streak: 3, status: "delivered", snapType: "chat", timeAgo: 1000 },
  { id: "3", name: "Michael Volpe", streak: 27, status: "opened", snapType: "video", timeAgo: 10000 },
];

export default function Chats() {
  const [friends, setFriends] = useState<Friend[]>(initialFriends);

  function formatTime(time: number) {
    const seconds = time;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(weeks / 52);

    if (years >= 1) {
      return `${years}y`;
    } else if (weeks >= 1) {
      return `${weeks}w`;
    } else if (days >= 1) {
      return `${days}d`;
    } else if (hours >= 1) {
      return `${hours}h`;
    } else if (minutes >= 1) {
      return `${minutes}m`;
    } else if (seconds >= 1) {
      return `${seconds}s`
    } else {
      return '';
    }
  }

  const renderFriend = ({ item }: { item: Friend }) => (
    <TouchableOpacity className="flex-row items-center justify-between px-4 py-3 border-b border-stone-800">
      <View className="flex-col">
        <Text className="text-white text-lg font-semibold">{item.name} 🔥{item.streak}</Text>
        <Text className="text-stone-400 text-sm">
          {item.status === "new" ? "New " : item.status === "delivered" ? "Delivered " : "Opened "}
          {item.snapType === "image" ? "Snap" : item.snapType === "video" ? "Video" : "Chat"} • {formatTime(item.timeAgo)}
        </Text>
      </View>
      {item.status === "new" && (
        <SymbolView name="circle.fill" tintColor="#ff3b30" size={14} />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <ScreenHeader transparent={true} title={"Chats"} addFriendsColor={"yellow"} />
      <View className="flex-1 bg-stone-950">
        <FlatList
          contentInsetAdjustmentBehavior="automatic"
          data={friends}
          keyExtractor={(item) => item.id}
          renderItem={renderFriend}
        />
      </View>
    </>
  );
}
