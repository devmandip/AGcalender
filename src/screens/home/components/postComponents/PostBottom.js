import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const PostBottom = props => {
  const {
    onLikePress,
    onViewPress,
    onMessagePress,
    onSharePress,
    oncommentPress,
    view_count,
    like_count,
  } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={onViewPress}>
        <AntDesign name="eyeo" size={25} />
        <Text style={styles.btn_txt}>{view_count}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={onLikePress}>
        <AntDesign name="hearto" size={25} />
        <Text style={styles.btn_txt}>{like_count}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={oncommentPress}>
        <Feather name="message-square" size={25} />
        <Text style={styles.btn_txt}>Comments</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={onMessagePress}>
        <MaterialCommunityIcons name="message-processing-outline" size={25} />
        <Text style={styles.btn_txt}>chat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={onSharePress}>
        <FontAwesome name="share-square-o" size={25} />
        <Text style={styles.btn_txt}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostBottom;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  btn_txt: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    marginTop: 5,
  },
});
