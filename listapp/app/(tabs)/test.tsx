import React, { useMemo, useRef, useCallback } from 'react';
import { View, Text, StatusBar, Button } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

export default function Test() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '70%'], []);

  const openSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
      <View className="flex-1 p-5 bg-slate-400 justify-center items-center">
        <StatusBar />

        <Button title="Open Bottom Sheet" onPress={openSheet} />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose
          handleIndicatorStyle={{ backgroundColor: 'red' }}
        >
          <BottomSheetView className='items-center'>
            <View className='h-full w-full'>
              <Text style={{ marginTop: 20 }}>This is inside the sheet</Text>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
  );
}
