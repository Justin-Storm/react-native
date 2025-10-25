import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabsLayout() {
    return (
        <NativeTabs minimizeBehavior="onScrollDown">
            <NativeTabs.Trigger name="(home)">
                <Icon sf='house.fill' />
                <Label>Home</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="(settings)">
                <Icon sf='gearshape.fill' />
                <Label>Settings</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="(search)" role='search'>
                <Label>Search</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}