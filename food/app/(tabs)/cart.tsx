import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useCart } from "@/lib/CartContext";
import { Ionicons } from "@expo/vector-icons";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <ScrollView className="p-4">
      <Text className="text-2xl font-bold mb-4">Your Cart</Text>

      {cart.length === 0 && <Text>Your cart is empty.</Text>}

      {cart.map((item) => (
        <View key={item.id} className="flex-row mb-4 items-center">
          <Image source={{ uri: item.image }} style={{ width: 80, height: 80 }} />
          <View className="ml-3 flex-1">
            <Text className="font-semibold">{item.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
          </View>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
