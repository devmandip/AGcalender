import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {moderatedScale, scale, theme} from '../utils';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text>Profile</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          style={styles.userImage}
          source={{
            uri: 'https://media.istockphoto.com/id/1319254635/photo/latin-american-farmer-working-in-agriculture-at-a-farm.jpg?s=612x612&w=0&k=20&c=uSUaq4iNJB1TYt4RCCtf9sp6FdPyJyHbXqmKa9AqFHY=',
          }}
        />
      </View>
      <Icon
        name="more-vertical"
        color={theme.colors.black}
        size={scale(20)}
        style={styles.menu}
        onPress={() => {
          alert('call');
        }}
      />

      <View style={styles.bodyContainer}></View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: theme.colors.gray,
    height: '15%',
  },
  imageContainer: {
    borderWidth: scale(1),
    width: scale(100),
    borderRadius: scale(50),
    overflow: 'hidden',
    position: 'absolute',
    top: '9%',
    marginLeft: moderatedScale(14),
  },
  userImage: {
    height: scale(100),
    width: scale(100),
    resizeMode: 'cover',
  },
  bodyContainer: {
    padding: moderatedScale(12),
  },
  menu: {
    alignSelf: 'flex-end',
    paddingTop: scale(5),
  },
});
