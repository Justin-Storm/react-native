import { Tabs, Stack } from "expo-router";
import { View } from 'react-native';

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen 
                name="index" 
                options={{
                    title: 'Home',
                    headerShown: false,
                }} 
            />
        </Tabs>
    );
};