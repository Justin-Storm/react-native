import React, { useState } from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    const newItems = { ...items };

    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);

      if (!newItems[strTime]) {
        newItems[strTime] = [];

        const numItems = Math.floor(Math.random() * 3 + 1);
        for (let j = 0; j < numItems; j++) {
          newItems[strTime].push({
            name: 'Item for ' + strTime + ' #' + j,
            height: Math.max(50, Math.floor(Math.random() * 150)),
            day: strTime
          });
        }
      }
    }

    setItems(newItems);
  };

  const renderItem = (reservation, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          flex: 1,
          borderRadius: 5,
          padding: 10,
          marginRight: 10,
          marginTop: 17
        }}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={{ height: 15, flex: 1, paddingTop: 30 }}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time: string | number | Date) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };
  

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2025-04-28'}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
      />
    </SafeAreaView>
  );
}
