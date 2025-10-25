import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabsLayout() {
    return (
        <NativeTabs minimizeBehavior='onScrollDown'>
            <NativeTabs.Trigger name='(teams)'>
                <Icon sf={'rectangle.3.group.fill'} />
                <Label>Teams</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name='(players)'>
                <Icon sf={'person.2.fill'} />
                <Label>Players</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}