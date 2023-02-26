import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import Header from './Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/core';
import {scale} from '../../../utils';

const Camera = () => {
  const [{cameraRef}, {takePicture}] = useCamera(null);

  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  const sec = new Date().getSeconds();

  const Time = `${hour}:${min}:${sec}`;

  const navigation = useNavigation();

  const onClick = async () => {
    try {
      const data = await takePicture();
      console.log(data.uri);

      navigation.navigate('ImageView', {imgURI: data.uri, Time});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Add Corp Photos/Videos" />

      <View style={styles.view1}>
        <Text style={styles.txt}>{Time}</Text>
        <Text style={styles.txt}>Ludhiyana</Text>
      </View>

      <RNCamera
        ref={cameraRef}
        style={styles.cameraView}
        type={RNCamera.Constants.Type.back}
      />

      <TouchableOpacity style={styles.icon_view} onPress={onClick}>
        <AntDesign name="camerao" size={scale(20)} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  view1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  cameraView: {
    height: 550,
    marginTop: 15,
  },
  txt: {
    color: 'black',
  },
  icon_view: {
    // marginTop: 15,
    alignItems: 'center',
  },
});
