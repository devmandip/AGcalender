import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale, theme} from '../../../utils';
import PostBottom from './postComponents/PostBottom';
import PostHeader from './postComponents/PostHeader';

const imgArr = [];

const ImageSection = props => {
  const {postImages, navigation, setIsVisible} = props;

  return (
    <View>
      <View style={{flexDirection: 'row', marginBottom: 2}}>
        <Image
          source={{uri: postImages[0].uri}}
          style={{height: scale(200), width: '40%', marginRight: 2}}
        />
        <Image
          source={{uri: postImages[1].uri}}
          style={{height: scale(200), width: '60%', marginRight: 2}}
        />
      </View>
      <View style={{flexDirection: 'row', marginBottom: 2}}>
        <Image
          source={{uri: postImages[2].uri}}
          style={{height: scale(120), width: '35%', marginRight: 2}}
        />
        <Image
          source={{uri: postImages[3].uri}}
          style={{height: scale(120), width: '35%', marginRight: 2}}
        />
        <TouchableOpacity
          // onPress={() => postImages.length >= 5 && setIsVisible(true)}
          onPress={() =>
            postImages.length >= 5 &&
            navigation.navigate('ImageView', {item: postImages})
          }>
          <Image
            source={{uri: postImages[4].uri}}
            style={{
              height: scale(120),
              width: '30%',
              backgroundColor: 'red',
            }}
          />

          {postImages.length >= 5 && (
            <View
              style={{
                backgroundColor: '#000000aa',
                position: 'absolute',
                height: scale(120),
                width: scale(95),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.txt1}>{`+ ${postImages.length - 5}`}</Text>
              <Text style={styles.txt1}>Images</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PostSection = props => {
  const {
    postImages,
    proicePic,
    name,
    description,
    view_count,
    like_count,
    oncommentPress,
    onMessagePress,
  } = props;

  const navigation = useNavigation();

  const [visible, setIsVisible] = useState(false);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.img_container} key={index}>
        <Image
          source={{uri: item?.imagePathSmall}}
          style={styles.post_imgStyle}
        />
        {/* {item?.type === 'image' ? (
        ) : (
          <VideoShow url={item?.uri} style={styles.video_View} />
        )} */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <PostHeader proicePic={proicePic} name={name} description={description} />
      {/* {postImages.length <= 4 ? ( */}
      <FlatList
        data={postImages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      {/* <ImageSection
        postImages={postImages}
        navigation={navigation}
        setIsVisible={setIsVisible}
      /> */}
      {/* )} */}
      <PostBottom
        name={name}
        like_count={like_count}
        view_count={view_count}
        oncommentPress={oncommentPress}
        onMessagePress={onMessagePress}
        description={description}
      />
      {/* <ImageView
        images={postImages}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        animationType="slide"
      /> */}
    </View>
  );
};

export default PostSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(5),
    margin: scale(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 1.62,
    backgroundColor: theme.colors.white,
    elevation: 4,
    borderRadius: scale(10),
  },
  post_imgStyle: {
    height: scale(200),
    width: scale(170),
    resizeMode: 'stretch',
  },
  img_container: {
    marginRight: 2,
  },
  video_View: {
    height: scale(200),
    width: scale(170),
    // borderRadius: 15,
  },

  // image section
  image_container: {
    borderWidth: 1,
  },
  image_View: {
    flexDirection: 'row',
  },
  txt1: {
    color: 'white',
    fontSize: 22,
    top: 15,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
