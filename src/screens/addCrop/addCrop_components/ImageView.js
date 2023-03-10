import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from './Header';
import Video from 'react-native-video';
import {scale, theme} from '../../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

const Details_section = () => {
  return (
    <View style={styles.details_container}>
      <View style={styles.details_view1}>
        <View style={styles.upView}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.primary_txt}>Corp Name </Text>
            <Text> Corp Variety </Text>
          </View>
          <Text>Area</Text>
        </View>

        <View style={{height: scale(75)}}></View>

        <View
          style={[styles.upView, {borderTopWidth: 1, borderBottomWidth: 0}]}>
          <Text style={styles.primary_txt}>Listing ID :</Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Entypo size={20} name="stopwatch" />
            <Text> 5 Days</Text>
          </View>
        </View>
      </View>

      <View style={styles.details_view2}>
        <TouchableOpacity style={styles.btn} onPress={() => {}}>
          <AntDesign name="hearto" size={25} color={theme.colors.gray2} />
          <Text style={styles.btn_txt}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => {}}>
          <FontAwesome
            name="share-square-o"
            size={25}
            color={theme.colors.gray2}
          />
          <Text style={styles.btn_txt}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => {}}>
          <AntDesign name="download" size={25} color={theme.colors.gray2} />
          <Text style={styles.btn_txt}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

      <Details_section />
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
    height: scale(400),
    marginTop: 15,
  },
  video_View: {
    width: scale(230),
    height: scale(410),
    borderRadius: 15,
  },

  details_container: {
    margin: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: scale(145),
  },
  details_view1: {
    borderWidth: scale(2),
    borderColor: '#56AB2F',
    width: scale(270),
    borderRadius: 15,
  },
  details_view2: {
    width: scale(50),
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scale(4),
  },
  btn_txt: {
    fontSize: scale(11),
    fontWeight: '400',
    color: theme.colors.gray2,
    marginTop: 3,
  },
  upView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: scale(8),
    borderBottomWidth: 1,
    borderColor: '#56AB2F',
  },
  primary_txt: {
    fontWeight: '600',
    color: 'black',
  },
});
