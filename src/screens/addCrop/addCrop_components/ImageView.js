import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Share,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from './Header';
import Video from 'react-native-video';
import {scale, theme} from '../../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import RNFetchBlob from 'rn-fetch-blob';

const ImageView = ({route}) => {
  const {imgURI, Time, videoURL, item} = route.params;
  const [locationName, setLocationName] = useState('');
  const [imgPath, setImgPath] = useState(item?.images[0]?.imagePathSmall);
  const [selIndex, setIndex] = useState(0);
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const CurrentDate = `${date}/${month}/${year}`;

  useEffect(() => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        item?.latitude +
        ',' +
        item?.longitude +
        '&key=' +
        'AIzaSyDENJOf97pAC3V97wgCXHxBr8YSLDeijDc',
    )
      .then(response => response.json())
      .then(responseJson => {
        const place = JSON.stringify(
          responseJson?.results[0]?.address_components[4]?.long_name,
        )?.replace(/"/g, '');
        setLocationName(place);
      });
  }, []);

  console.log('POST  ITEM', item);

  const downloadImage = () => {
    let date = new Date();
    let image_URL = imgPath;
    // let ext = getExtention(image_URL);
    // ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.DocumentDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          'png',
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const onSharePress = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message:
          'Please install this app and stay safe , AppLink :https://play.google.com',
        url: 'https://play.google.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const Details_section = () => {
    return (
      <View style={styles.details_container}>
        <View style={styles.details_view1}>
          <View style={styles.upView}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.primary_txt}>{item?.cropName}</Text>
              <Text>{' ' + item?.variety + ' '}</Text>
            </View>
            <Text> {item?.area}</Text>
          </View>

          <View style={{height: scale(75)}}></View>

          <View
            style={[styles.upView, {borderTopWidth: 1, borderBottomWidth: 0}]}>
            <Text style={styles.primary_txt}>
              {'Listing ID :' + item?.cropListingId}
            </Text>

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

          <TouchableOpacity style={styles.btn} onPress={onSharePress}>
            <FontAwesome
              name="share-square-o"
              size={25}
              color={theme.colors.gray2}
            />
            <Text style={styles.btn_txt}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (imgPath === '') {
                alert('pleae select image which you want download');
              } else {
                downloadImage();
              }
            }}>
            <AntDesign name="download" size={25} color={theme.colors.gray2} />
            <Text style={styles.btn_txt}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title=" Corp Photos/Videos" />

      <View style={styles.view1}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.txt}>{item?.harvestStartDate}</Text>
          <Text style={[styles.txt, {left: 20}]}>{Time}</Text>
        </View>
        <Text style={styles.txt}>{locationName}</Text>
      </View>

      <View style={{flex: 0.9}}>
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}>
          {item?.images.map((obj, index) => {
            console.log('objz....', obj);
            return (
              <TouchableOpacity
                onPress={() => {
                  setImgPath(obj?.imagePathSmall);
                  setIndex(index);
                }}>
                <Image
                  source={{uri: obj?.imagePathSmall}}
                  style={[
                    styles.ImageView,
                    {
                      borderWidth: selIndex === index ? 1 : 0,
                      borderColor: theme.colors.green,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* {imgURI === undefined ? (
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
      )} */}

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
    marginHorizontal: scale(10),
    width: scale(250),
    height: scale(350),
    borderRadius: 10,
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
