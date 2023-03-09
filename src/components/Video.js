import React, {useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Platform} from 'react-native';
import Icon1 from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import {scale, theme} from '../utils';

const VideoShow = props => {
  const {
    url,
    endVideo,
    videoStyle,
    style,
    flatListScroll,
    fullScreen,
    resizeMode,

    thumbnail,
  } = props;
  const [val, setVal] = React.useState(0);
  const [isPlay, setPlay] = React.useState(true);
  const toggleVideoPlay = () => {
    setPlay(!isPlay);
    setVal(flatListScroll);
  };
  console.log('url', url);
  return (
    <View style={[styles.container, style]}>
      <Video
        source={{uri: url}}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={resizeMode === undefined ? 'cover' : resizeMode}
        style={[styles.video, videoStyle]}
        paused={isPlay}
        playInBackground={false}
        playWhenInactive={false}
        repeat={true}
        onEnd={endVideo}
        fullscreen={fullScreen === undefined ? null : fullScreen}
        ignoreSilentSwitch={'ignore'}
        poster={
          Platform.OS === 'ios' ? null : thumbnail == undefined ? '' : thumbnail
        }
        posterResizeMode={'contain'}
        disableFocus={false}
      />
      {!fullScreen && (
        <TouchableOpacity
          onPress={() => toggleVideoPlay()}
          style={styles.button}>
          <Icon1
            name={isPlay ? 'play' : 'pause'}
            size={scale(35)}
            color={theme.colors.white}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {width: '100%', height: '100%'},
  button: {position: 'absolute'},
  iconCon: {
    position: 'absolute',
    bottom: scale(5),
    left: scale(5),
    flexDirection: 'row',
  },
  txt: {
    fontFamily: theme.fonts.muktaRegular,
    fontSize: scale(10),
    color: theme.colors.white,
    alignItems: 'center',
    left: scale(5),
  },
});

export default VideoShow;
