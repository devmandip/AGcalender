import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import Header from './Header';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/core';
import {scale, theme} from '../../../utils';
import {cameraOptions} from '../../../utils/MockData';
import ImagePicker from 'react-native-image-picker';

const selectImage = () => {
  ImagePicker.showImagePicker({}, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = {uri: response.uri};
      // Do whatever you want with the source object, e.g. display it in an <Image> component
    }
  });
};

const ClickBtn = props => {
  const {Icon_name, onIcon_press, Icon_style, color, borderColor} = props;

  return (
    <TouchableOpacity
      onPress={onIcon_press}
      style={[styles.icon_view, {borderColor: borderColor}]}>
      <Icon_style name={Icon_name} size={scale(20)} color={color} />
    </TouchableOpacity>
  );
};

const ClickBtn2 = props => {
  const {Icon_name, onIcon_press, Icon_style, color} = props;

  return (
    <TouchableOpacity onPress={onIcon_press} style={styles.icon_view2}>
      <Icon_style name={Icon_name} size={scale(40)} color={color} />
    </TouchableOpacity>
  );
};

const Camera = () => {
  const [{cameraRef}, {takePicture, recordVideo, stopRecording}] =
    useCamera(null);

  const [isRecording, setIsRecording] = useState(false);

  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  const sec = new Date().getSeconds();

  const Time = `${hour}:${min}:${sec}`;

  const navigation = useNavigation();

  const onCpture_Click = async () => {
    try {
      const data = await takePicture();
      console.log(data.uri);

      navigation.navigate('ImageView', {imgURI: data.uri, Time});
    } catch (error) {
      console.log(error);
    }
  };

  const on_record = async () => {
    try {
      if (isRecording) {
        setIsRecording(false);
        const data = await stopRecording();
      } else {
        setIsRecording(true);
        const data = await recordVideo();

        navigation.navigate('ImageView', {
          videoURL: data.uri,
          Time,
        });
      }
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
        <ClickBtn Icon_name="image" Icon_style={Icon1} color="black" />

        <ClickBtn
          Icon_name="video"
          Icon_style={Icon}
          onIcon_press={on_record}
          color={isRecording === true ? 'red' : 'black'}
          borderColor={isRecording === true ? 'red' : 'black'}
        />

        <ClickBtn2
          Icon_name="camera"
          Icon_style={Icon1}
          onIcon_press={onCpture_Click}
          color="black"
        />

        <ClickBtn Icon_name="zap" Icon_style={Icon} color="black" />

        <ClickBtn
          Icon_name="camera-reverse-outline"
          Icon_style={Icon1}
          color="black"
        />
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
    height: theme.SCREENHEIGHT * 0.68,
    marginTop: 8,
  },
  txt: {
    color: 'black',
  },
  camerabtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    alignItems: 'center',
    height: scale(80),
    paddingBottom: scale(20),
  },
  icon_view: {
    borderColor: theme.colors.black,
    height: scale(35),
    width: scale(35),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  icon_view2: {
    borderColor: theme.colors.black,
    height: scale(60),
    width: scale(60),
    borderRadius: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});
