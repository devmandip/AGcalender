import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {scale, theme} from '../../../../utils';

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
        <AntDesign name="eyeo" size={25} color={theme.colors.gray2} />
        <Text style={styles.btn_txt}>{view_count}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={onLikePress}>
        <AntDesign name="hearto" size={25} color={theme.colors.gray2} />
        <Text style={styles.btn_txt}>{like_count}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={oncommentPress}>
        <MaterialCommunityIcons
          name="whatsapp"
          size={25}
          color={theme.colors.gray2}
        />
        <Text style={styles.btn_txt}>whatsapp</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={onMessagePress}>
        <MaterialCommunityIcons
          name="phone"
          size={25}
          color={theme.colors.gray2}
        />
        <Text style={styles.btn_txt}>Phone</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={onSharePress}>
        <FontAwesome
          name="share-square-o"
          size={25}
          color={theme.colors.gray2}
        />
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
    fontSize: scale(12),
    fontWeight: '400',
    color: 'black',
    marginTop: 5,
  },
});
