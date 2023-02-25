import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PostHeader from './postComponents/PostHeader';
import PostBottom from './postComponents/PostBottom';
import {useNavigation} from '@react-navigation/core';
import ImageView from 'react-native-image-viewing';

const imgArr = [];

const ImageSection = props => {
  const {postImages, navigation, setIsVisible} = props;
  console.log('this is post images :', postImages);

  return (
    <View>
      {postImages.length === 4 ? (
        <View>
          <View style={{flexDirection: 'row', marginBottom: 2}}>
            <Image
              source={{uri: postImages[0].uri}}
              style={{height: 200, width: '50%', marginRight: 2}}
            />
            <Image
              source={{uri: postImages[1].uri}}
              style={{height: 200, width: '50%'}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: postImages[2].uri}}
              style={{height: 200, width: '50%', marginRight: 2}}
            />
            <Image
              source={{uri: postImages[3].uri}}
              style={{height: 200, width: '50%'}}
            />
          </View>
        </View>
      ) : (
        <View>
          <View style={{flexDirection: 'row', marginBottom: 2}}>
            <Image
              source={{uri: postImages[0].uri}}
              style={{height: 200, width: '40%', marginRight: 2}}
            />
            <Image
              source={{uri: postImages[1].uri}}
              style={{height: 200, width: '60%', marginRight: 2}}
            />
          </View>
          <View style={{flexDirection: 'row', marginBottom: 2}}>
            <Image
              source={{uri: postImages[2].uri}}
              style={{height: 130, width: 157, marginRight: 2}}
            />
            <Image
              source={{uri: postImages[3].uri}}
              style={{height: 130, width: 116, marginRight: 2}}
            />
            <TouchableOpacity
              onPress={() => postImages.length > 5 && setIsVisible(true)}>
              <Image
                source={{uri: postImages[4].uri}}
                style={{height: 130, width: 116, backgroundColor: 'red'}}
              />

              {postImages.length > 5 && (
                <View
                  style={{
                    backgroundColor: '#000000aa',
                    position: 'absolute',
                    height: 130,
                    width: 116,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.txt1}>{`+ ${
                    postImages.length - 5
                  }`}</Text>
                  <Text style={styles.txt1}>Images</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const PostSection = props => {
  const {postImages, proicePic, name, description, view_count, like_count} =
    props;

  const navigation = useNavigation();

  const [visible, setIsVisible] = useState(false);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.img_container}>
        <Image source={{uri: item.uri}} style={styles.post_imgStyle} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <PostHeader proicePic={proicePic} name={name} description={description} />

      {postImages.length < 4 ? (
        <FlatList
          data={postImages}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <ImageSection
          postImages={postImages}
          navigation={navigation}
          setIsVisible={setIsVisible}
        />
      )}

      <PostBottom like_count={like_count} view_count={view_count} />

      <ImageView
        images={postImages}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        animationType="slide"
      />
    </View>
  );
};

export default PostSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  post_imgStyle: {
    height: 200,
    width: 171,
  },
  img_container: {
    marginRight: 2,
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
});
