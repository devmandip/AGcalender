import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import PostHeader from './postComponents/PostHeader';
import PostBottom from './postComponents/PostBottom';
import {useNavigation} from '@react-navigation/core';

const ImageSection = props => {
  const {postImages, navigation} = props;
  console.log('this is post images :', postImages);

  return (
    <View>
      {postImages.length === 4 ? (
        <View>
          <View style={{flexDirection: 'row', marginBottom: 2}}>
            <Image
              source={postImages[0].img}
              style={{height: 200, width: '50%', marginRight: 2}}
            />
            <Image
              source={postImages[1].img}
              style={{height: 200, width: '50%'}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={postImages[2].img}
              style={{height: 200, width: '50%', marginRight: 2}}
            />
            <Image
              source={postImages[3].img}
              style={{height: 200, width: '50%'}}
            />
          </View>
        </View>
      ) : (
        <View>
          <View style={{flexDirection: 'row', marginBottom: 2}}>
            <Image
              source={postImages[0].img}
              style={{height: 200, width: '40%', marginRight: 2}}
            />
            <Image
              source={postImages[1].img}
              style={{height: 200, width: '60%', marginRight: 2}}
            />
          </View>
          <View style={{flexDirection: 'row', marginBottom: 2}}>
            <Image
              source={postImages[2].img}
              style={{height: 130, width: 157, marginRight: 2}}
            />
            <Image
              source={postImages[3].img}
              style={{height: 130, width: 116, marginRight: 3}}
            />
            <TouchableOpacity
              onPress={() =>
                postImages.length > 5 &&
                navigation.navigate('ImageView', {item: postImages})
              }>
              <Image
                source={postImages[4].img}
                style={{height: 130, width: 116, backgroundColor: 'red'}}
              />

              {postImages.length > 5 && (
                <View
                  style={{
                    backgroundColor: 'rgba(52, 52, 52, 0.8)',
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

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.img_container}>
        <Image source={item.img} style={styles.post_imgStyle} />
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
        <ImageSection postImages={postImages} navigation={navigation} />
      )}

      <PostBottom like_count={like_count} view_count={view_count} />
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
    marginRight: 5,
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
    top: 10,
  },
});
