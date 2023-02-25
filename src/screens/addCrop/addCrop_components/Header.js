import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Header = props => {
  const {title} = props;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/Images/logo.png')}
        style={styles.logoImg}
      />
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
