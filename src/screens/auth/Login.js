import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import OTPTextView from 'react-native-otp-textinput';
import {images, scale, theme} from '../../utils';
import {Button, InputBox, Label} from '../../components';
import {useNavigation} from '@react-navigation/core';

const Login = () => {
  const navigation = useNavigation();
  const [otp, setotp] = useState('');
  const [otpSend, setOtpSend] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-full-matte-grain-texture-flare-black-background-granulefrosted-textureblackblack-goldfrosted-image_71659.jpg',
        }}
        style={styles.container}>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View style={styles.logoContainer}>
            <Image source={images.FLogo} style={styles.logoStyle} />
            <Label title="Harvesting calendar" style={styles.txt} />
          </View>
          <View style={styles.contactForm}>
            <Label title="Mobile Number" style={styles.title} />
            <InputBox />
            {otpSend && (
              <>
                <Label title="OTP" style={styles.title} />
                <OTPTextView
                  handleTextChange={e => {
                    setotp(e);
                  }}
                  containerStyle={styles.textInputContainer}
                  textInputStyle={styles.roundedTextInput}
                  defaultValue=""
                  inputCount={6}
                  tintColor={theme.colors.primary}
                />
              </>
            )}
            <View>
              <Button
                onPress={() => {
                  otpSend ? navigation.navigate('Tab') : setOtpSend(!otpSend);
                }}
                title={otpSend ? 'Login' : 'Get OTP'}
                style={styles.btn}
                titleStyle={styles.btnTxt}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignUp');
                }}
                style={styles.row}>
                <Text style={styles.signupTxt}>
                  Don’t have account?{'  '}
                  <Text style={styles.signupTxt1}>Sign Up</Text>
                </Text>

                <Label title="Forgot Password?" style={styles.forgottxt} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoStyle: {
    width: scale(100),
    height: scale(100),
    resizeMode: 'contain',
  },
  btn: {
    marginTop: scale(25),
  },
  btnTxt: {
    fontSize: scale(14),
    fontWeight: '600',
  },
  contactForm: {
    marginTop: -theme.SCREENHEIGHT * 0.1,
    margin: scale(10),
    paddingHorizontal: scale(10),
  },
  logoContainer: {
    marginTop: theme.SCREENHEIGHT * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {color: theme.colors.white, fontWeight: '600'},
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
  roundedTextInput: {
    color: theme.colors.white,
    width: '13%',
  },
  textInputContainer: {
    marginTop: scale(-10),
    height: scale(40),
    // paddingHorizontal: scale(5),
  },
});
