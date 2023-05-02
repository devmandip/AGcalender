import {
  ActivityIndicator,
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
import ApiService, {API} from '../../utils/ApiService';
import {useDispatch} from 'react-redux';
import {isLogin, userData} from '../../redux/Actions/UserActions';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';

const Login = () => {
  const navigation = useNavigation();
  const [otp, setotp] = useState('');
  const [pNumber, setPNumber] = useState('');
  const [otpSend, setOtpSend] = useState(false);
  const [load, setLoad] = useState(false);
  const toast = useToast();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoad(true);
    // var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');

    // var raw = JSON.stringify({
    //   mobile: pNumber,
    // });

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      mobile: pNumber,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://agmart.ngrok.app/api/auth/auth', requestOptions)
      .then(response => response.text())
      .then(response => {
        console.log('response>>> ', response);
        toast.show(response, {
          type: 'success',
          placement: 'bottom',
          duration: 1000,
          animationType: 'zoom-in',
        });
        setOtpSend(true);
        setLoad(false);
      })
      .catch(error => {
        setLoad(false);
        console.log('error', error);
      });
  };
  const verifyOTP = async () => {
    setLoad(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      phoneNumber: pNumber,
      otp: otp,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://agmart.ngrok.app/api/auth/authenticate', requestOptions)
      .then(response => response.json())
      .then(response => {
        console.log('response>>> ', response);
        if (response?.user) {
          dispatch(isLogin(true));
          dispatch(userData(response));
          navigation.navigate('Tab');
          setLoad(false);
        } else {
          console.log(response);
          setLoad(false);
          toast.show('wrong details.', {
            type: 'error',
            placement: 'bottom',
            duration: 1000,
            animationType: 'zoom-in',
          });
        }
      })
      .catch(error => {
        console.log(error);
        setLoad(false);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={images.background} style={styles.container}>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View style={styles.logoContainer}>
            <Image source={images.FLogo} style={styles.logoStyle} />
            <Label title="Harvesting calendar" style={styles.txt} />
          </View>
          <View style={styles.contactForm}>
            <Label title="Phone Number" style={styles.title} />
            <InputBox
              value={pNumber}
              onChangeText={txt => {
                setPNumber(txt);
              }}
            />
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
                  inputCount={4}
                  tintColor={theme.colors.primary}
                />
              </>
            )}
            <View>
              {load ? (
                <ActivityIndicator
                  size={'large'}
                  color={theme.colors.primary}
                />
              ) : (
                <Button
                  onPress={() => {
                    otpSend ? verifyOTP() : handleLogin();
                    // otpSend ? navigation.navigate('Tab') : setOtpSend(!otpSend);
                  }}
                  title={otpSend ? 'Verify OTP' : 'Send OTP'}
                  style={styles.btn}
                  titleStyle={styles.btnTxt}
                />
              )}
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
    backgroundColor: '#000',
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
