import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SearchBar from './SearchBar';

const Header = () => {
  const logoImg = '../../../assets/Images/logo.png';

  return (
    <View style={styles.conatainer}>
      <Image source={require(logoImg)} style={styles.logoImg_style} />
      <SearchBar />
      <TouchableOpacity onPress={() => {}}>
        <FontAwesome5 name="shopping-basket" size={25} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  conatainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logoImg_style: {
    height: 35,
    width: 35,
  },
});
