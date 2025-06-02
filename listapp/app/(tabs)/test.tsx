import React, { useMemo, useRef, useCallback } from 'react';
import { View, Text, StatusBar, Button } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Link } from 'expo-router';

export default function Test() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '70%'], []);

  const openSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
      <View className="flex-1 p-5 justify-center items-center">
        <Link href="https://getbootstrap.com/">
          <Text className="text-2xl">Test</Text>
        </Link>
      </View>
  );
}
