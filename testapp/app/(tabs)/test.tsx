import React from 'react';
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Test() {
  return (
    <View className='flex-1'>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            className='mb-24'
          >
            <View style={{ padding: 16 }}>
              <Text style={{ marginBottom: 8 }}>Your message:</Text>
              <TextInput
                placeholder="Type something..."
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: '#fff',
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
