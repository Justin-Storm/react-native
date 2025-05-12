import { View, Text } from 'react-native'
import React, { useState, useMemo } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'

export default function test() {
    const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);
    return (
        <View>
            <BottomSheet
                snapPoints={snapPoints}
            >
                <View>
                    <Text>This is a bottom sheet.</Text>
                </View>
            </BottomSheet>
        </View>
    )
}