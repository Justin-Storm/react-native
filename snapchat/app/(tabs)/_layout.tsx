import React from 'react';
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabsLayout() {
    return (
        <NativeTabs>
            <NativeTabs.Trigger name='(chats)'>
                <Icon sf={'bubble'} />
                <Label>{''}</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name='(camera)'>
                <Icon sf={'camera'} />
                <Label>{''}</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name='(search)' role='search'>
                <Label>Search</Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    )
}