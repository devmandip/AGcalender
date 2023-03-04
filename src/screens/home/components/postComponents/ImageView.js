import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PostBottom from './PostBottom';
import {scale} from '../../../../utils';

const renderItem = ({item}) => {
  return (
    <View>
      <Image source={{uri: item.uri}} style={styles.img_view} />
      <PostBottom view_count="200" like_count="145" />
    </View>
  );
};

const ImageView = ({route}) => {
  const {item} = route.params;
  console.log(JSON.stringify(item, null, 4));
  return (
    <View style={styles.container}>
      <FlatList
        data={item}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: scale(50),
  },
  img_view: {
    height: scale(350),
    width: scale(350),
  },
});
