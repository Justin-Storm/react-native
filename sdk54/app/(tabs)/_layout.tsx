import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Drawer } from 'expo-router/drawer';

export default function TabLayout() {
  return (
    <NativeTabs minimizeBehavior="onScrollDown" tintColor={'orange'}>
      <NativeTabs.Trigger name="(home)">
        <Label>World Clock</Label>
        <Icon sf="globe" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(alarms)">
        <Icon sf="alarm.fill"  />
        <Label>Alarms</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(stopwatch)">
        <Icon sf="stopwatch.fill"  />
        <Label>Stopwatch</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(timers)">
        <Icon sf="timer"  />
        <Label>Timers</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}