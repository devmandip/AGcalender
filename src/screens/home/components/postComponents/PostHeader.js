import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import UserAvatar from 'react-native-user-avatar';
const PostHeader = props => {
  const {proicePic, name, description} = props;

  return (
    <View style={styles.container}>
      <View style={styles.first_section}>
        <UserAvatar
          size={70}
          name={name}
          // src="https://dummyimage.com/100x100/000/fff"
          style={styles.proileImg_style}
        />
        {/* <Image source={proicePic} style={styles.proileImg_style} /> */}
      </View>

      <View style={styles.second_Section}>
        <Text style={styles.txt}>
          <Text style={styles.name_txt}>{name} </Text>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  proileImg_style: {
    height: 50,
    width: 50,
  },
  first_section: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  second_Section: {
    width: '80%',
  },
  txt: {
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
  },
  name_txt: {
    fontSize: 14,
    fontWeight: '600',
  },
});
