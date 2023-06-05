import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/AntDesign';
import {scale} from '../../../utils';
const Header = props => {
  const {title} = props;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Icon
        name="left"
        size={scale(22)}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <TouchableOpacity
        style={styles.first_section}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={require('../../../assets/Images/logo.png')}
          style={styles.logoImg}
        />
      </TouchableOpacity>
      <View style={styles.txtView}>
        <Text style={styles.txt}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  logoImg: {
    height: 35,
    width: 35,
  },
  txtView: {
    width: 300,
    alignItems: 'center',
  },
  txt: {
    fontSize: 20,
    color: 'black',
    fontWeight: '900',
  },
});
