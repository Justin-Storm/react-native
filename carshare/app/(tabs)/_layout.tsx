import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function _layout() {
  return (
    <NativeTabs minimizeBehavior='onScrollDown'>
      <NativeTabs.Trigger name='(home)'>
        <Icon sf={'house.fill'} />
        <Label>{''}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='(users)'>
        <Icon sf={'person.2.fill'} />
        <Label>{''}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='(profile)'>
        <Icon sf={'person.fill'} />
        <Label>{''}</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='(create)' role='search'>
        <Icon sf={'plus'} />
        <Label>Create</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}