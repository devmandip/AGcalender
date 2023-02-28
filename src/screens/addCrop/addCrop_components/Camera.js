import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import Header from './Header';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/core';
import {scale, theme} from '../../../utils';
import {cameraOptions} from '../../../utils/MockData';

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
      <View style={styles.camerabtnView}>
        {cameraOptions.map((item, index) => {
          return (
            <TouchableOpacity style={styles.icon_view} onPress={onClick}>
              {item?.id !== 5 ? (
                <Icon
                  name={item.icon}
                  key={index}
                  size={scale(20)}
                  color="black"
                />
              ) : (
                <Icon1
                  name={item.icon}
                  key={index}
                  size={scale(20)}
                  color="black"
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
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
    height: theme.SCREENHEIGHT * 0.7,
    marginTop: 15,
  },
  txt: {
    color: 'black',
  },
  camerabtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    alignItems: 'center',
    height: scale(45),
  },
  icon_view: {
    borderWidth: scale(1.4),
    borderColor: theme.colors.black,
    height: scale(35),
    width: scale(35),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
