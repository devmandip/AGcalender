import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images, scale, theme} from '../../utils';
import {Button, InputBox, Label} from '../../components';
import {useNavigation} from '@react-navigation/core';

const Signup = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-full-matte-grain-texture-flare-black-background-granulefrosted-textureblackblack-goldfrosted-image_71659.jpg',
        }}
        style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={images.Logo} style={styles.logoStyle} />
          <Label title="  Harvesting calendar" style={styles.txt} />
        </View>
        <Label title="Login With" style={styles.loginwith} />
        <View style={styles.loginView}>
          <Image source={images.google} style={styles.loginLogo} />
          <Image source={images.fb} style={styles.loginLogo} />
          <Image source={images.linkedin} style={styles.loginLogo} />
        </View>
        <View style={styles.orView}>
          <View style={styles.line} />
          <Label title="Or" style={styles.or} />
          <View style={styles.line} />
        </View>
        <Icon
          name="user-circle-o"
          size={scale(60)}
          color={theme.colors.white}
          style={{alignSelf: 'center', marginTop: scale(8)}}
          onPress={() => {
            Alert.alert('call');
          }}
        />

        <View style={styles.contactForm}>
          <Label title="Name" style={styles.title} />
          <InputBox />
          <Label title="Location" style={styles.title} />
          <InputBox />
          <Label title="Mobile" style={styles.title} />
          <InputBox />
          <Label title="Profession" style={styles.title} />
          <InputBox />

          <Button
            title="Sign Up"
            style={styles.btn}
            titleStyle={styles.btnTxt}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={styles.row}>
            <Text style={styles.signupTxt}>
              Already have account?{'  '}
              <Text style={styles.signupTxt1}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoStyle: {
    width: scale(30),
    height: scale(30),
    resizeMode: 'contain',
  },
  loginLogo: {
    height: scale(20),
    width: scale(20),
    resizeMode: 'contain',
    padding: scale(2),
    marginHorizontal: scale(10),
  },
  loginView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginwith: {
    marginTop: theme.SCREENHEIGHT * 0.05,
    textAlign: 'center',
    color: theme.colors.white,
    marginVertical: scale(18),
  },
  orView: {
    marginVertical: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: '30%',
    height: scale(1),
    backgroundColor: theme.colors.white,
  },
  or: {
    fontSize: scale(12),
    color: theme.colors.white,
    textAlign: 'center',
    marginHorizontal: scale(10),
    // marginVertical: scale(5),
  },
  btn: {
    marginTop: scale(25),
  },
  btnTxt: {
    fontSize: scale(14),
    fontWeight: '600',
  },
  contactForm: {
    // marginTop: theme.SCREENHEIGHT * 0.1,
    margin: scale(10),
    paddingHorizontal: scale(10),
  },
  logoContainer: {
    marginTop: theme.SCREENHEIGHT * 0.02,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },
  txt: {
    color: theme.colors.white,
    // fontWeight: '600',
    fontFamily: theme.fonts.InterBold,
  },
  title: {
    color: theme.colors.white,
    paddingVertical: scale(5),
    fontSize: scale(12),
    fontWeight: '500',
  },
  signupTxt: {
    fontSize: scale(11),
    color: theme.colors.white,
  },
  signupTxt1: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgottxt: {
    color: theme.colors.white,
    fontSize: scale(12),
  },
});
