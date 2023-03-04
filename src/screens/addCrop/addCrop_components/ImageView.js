import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Header from './Header';
import Video from 'react-native-video';
import {scale} from '../../../utils';

const ImageView = ({route}) => {
  const {imgURI, Time, videoURL} = route.params;

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const CurrentDate = `${date}/${month}/${year}`;

  console.log('image url', imgURI);
  console.log('video url', videoURL);

  return (
    <View style={styles.container}>
      <Header title="Add Corp Photos/Videos" />

      <View style={styles.view1}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.txt}>{CurrentDate}</Text>
          <Text style={[styles.txt, {left: 20}]}>{Time}</Text>
        </View>
        <Text style={styles.txt}>Ludhiyana</Text>
      </View>

      {imgURI === undefined ? (
        <View style={{alignItems: 'center', marginTop: scale(15)}}>
          <Video
            source={{
              uri: videoURL,
            }}
            style={styles.video_View}
            controls={true}
          />
        </View>
      ) : (
        <Image source={{uri: imgURI}} style={styles.ImageView} />
      )}
    </View>
  );
};

export default ImageView;

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
  txt: {
    color: 'black',
  },
  ImageView: {
    height: 550,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 15,
  },
  video_View: {
    width: scale(230),
    height: scale(410),
    borderRadius: 15,
  },
});
