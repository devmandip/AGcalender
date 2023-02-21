import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import PostHeader from './postComponents/PostHeader';
import PostBottom from './postComponents/PostBottom';

const renderItem = ({item}) => {
  console.log('this is post item : ', JSON.stringify(item.img, null, 4));

  return (
    <TouchableOpacity style={styles.img_container}>
      <Image source={item.img} style={styles.post_imgStyle} />
    </TouchableOpacity>
  );
};

const PostSection = props => {
  const {postImages, proicePic, name, description, view_count, like_count} =
    props;

  return (
    <View style={styles.container}>
      <PostHeader proicePic={proicePic} name={name} description={description} />

      <FlatList
        data={postImages}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

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
});
