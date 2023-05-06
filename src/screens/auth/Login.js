import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import OTPTextView from 'react-native-otp-textinput';
import {images, scale, theme} from '../../utils';
import {Button, InputBox, Label} from '../../components';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {isLogin, userData} from '../../redux/Actions/UserActions';
import {useToast} from 'react-native-toast-notifications';
import Geolocation from '@react-native-community/geolocation';
import {postServiceCall} from '../../api/Webservice';
import {ApiList} from '../../api/ApiList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [otp, setotp] = useState('');
  const [pNumber, setPNumber] = useState('');
  const [otpSend, setOtpSend] = useState(false);
  const [load, setLoad] = useState(false);
  const toast = useToast();

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await requestLocationPermission();
      })();
    }, []),
  );

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        GetLocation();
        // alert('You can use the location');
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const GetLocation = () => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      global.currentLocation = crd;
    }).catch(err => {
      console.log(err);
    });
  };

  const handleLogin = async () => {
    if (pNumber) {
      setLoad(true);
      var params = {
        mobile: pNumber,
      };
      postServiceCall(ApiList.SEND_OTP, params, true)
        .then(async responseJson => {
          if (responseJson?.data != '') {
            toast.show(responseJson?.data, {
              type: 'success',
              placement: 'bottom',
              duration: 1000,
              animationType: 'zoom-in',
            });
            setOtpSend(true);
            setLoad(false);
          }
          setLoad(false);
        })
        .catch(error => {
          setLoad(false);
        });
    }
  };
  const verifyOTP = async () => {
    setLoad(true);
    setLoad(true);
    var params = {
      phoneNumber: pNumber,
      otp: otp,
    };
    postServiceCall(ApiList.VERIIFY_OTP, params, true)
      .then(async responseJson => {
        if (responseJson?.data != '') {
          if (responseJson?.data) {
            await AsyncStorage.setItem(
              'token',
              responseJson?.data?.accessToken,
            );
            dispatch(isLogin(true));
            dispatch(userData(responseJson?.data?.user));
            navigation.navigate('Tab');
            setLoad(false);
          } else {
            setLoad(false);
            toast.show('wrong details.', {
              type: 'error',
              placement: 'bottom',
              duration: 1000,
              animationType: 'zoom-in',
            });
          }
          setLoad(false);
        }
        setLoad(false);
      })
      .catch(error => {
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
              maxLength={10}
              keyboardType="numeric"
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
