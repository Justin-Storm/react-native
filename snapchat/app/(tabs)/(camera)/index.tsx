import { Alert, Text, TouchableOpacity, View, Image, Button } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from "react";
import { Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import * as MediaLibrary from 'expo-media-library';

export default function Camera() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
   const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [facing, setFacing] = useState<CameraType>("front");
  const cameraRef = useRef<CameraView>(null);
  const [imageURI, setImageURI] = useState('');
  const lastTap = useRef<number | null>(null);
  const [downloadedImage, setDownloadedImage] = useState('');

  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (!cameraPermission) {
    return <View className="flex-1 bg-stone-950" />
  }

  if (!cameraPermission.granted) {
    return (
      <View className='flex-1 items-center justify-center bg-stone-950'>
        <Text className='text-lg text-white'>We need your permission to show the camera</Text>
        <Button onPress={requestCameraPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function handleDoubleTap() {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      toggleCameraFacing();
    }
    lastTap.current = now;
  }

  async function takePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
          skipProcessing: true,
        });
        setImageURI(photo.uri);
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  }

  
  const saveImage = async () => {
    let permission = mediaPermission;
    if (!permission || permission.status !== 'granted') {
        const newPermission = await requestMediaPermission();
        permission = newPermission;
    }
    if (permission && permission.status === 'granted') {
        try {
            await MediaLibrary.createAssetAsync(imageURI);
            setDownloadedImage(imageURI);
            alert('Image saved to gallery!');
        } catch (error) {
            console.error('Error saving image:', error);
            alert('Failed to save image.');
        }
    } else {
        alert('Permission to access media library denied.');
    }
  };

  
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            imageURI ? (
              <TouchableOpacity className="w-[35] h-[35] items-center justify-center" onPress={() => { setImageURI(''); setDownloadedImage(''); }}>
                <SymbolView name="xmark" tintColor={'#fff'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="w-[35] h-[35] items-center justify-center">
                <SymbolView name="person.fill" tintColor={'#fff'} />
              </TouchableOpacity>
            )
          ),
          headerRight: () => (
            !imageURI ? (
              <View className="flex-row gap-3">
                <TouchableOpacity className="w-[35] h-[35] items-center justify-center">
                  <SymbolView name="bell" tintColor={'#fff'} />
                </TouchableOpacity>
                <TouchableOpacity className="w-[35] h-[35] items-center justify-center">
                  <SymbolView name="person.badge.plus" tintColor={'#fff'} />
                </TouchableOpacity>
                <TouchableOpacity className="w-[35] h-[35] items-center justify-center" onPress={toggleCameraFacing}>
                  <SymbolView name="camera.rotate" tintColor={'#fff'} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity className="w-[35] h-[35] items-center justify-center" onPress={saveImage}>
                <SymbolView name={downloadedImage === imageURI ? "checkmark" : "arrow.down.to.line.alt"} tintColor={'#fff'} />
              </TouchableOpacity>
            )
          )
        }}
      />
      <View className="flex-1">
        {!imageURI ? (
          <View className="flex-1">

            <CameraView 
              ref={cameraRef}
              style={{ flex: 1 }} 
              facing={facing} 
              mirror={true}
            />
            <TouchableOpacity className="z-[1] absolute top-0 left-0 w-full h-full" onPress={handleDoubleTap} />
            <View className="z-[2] bottom-[110] w-full flex-row justify-center absolute left-0">
              <TouchableOpacity onPress={takePicture}>
                <SymbolView name="circle" size={100} tintColor={'#fff'} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Image
            source={{ uri: imageURI }}
            height={'100%'}
            width={'100%'}
            resizeMode="contain"
          />
        )}
      </View>
    </>
  );
}
