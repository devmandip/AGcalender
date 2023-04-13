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
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {images, scale, theme} from '../../utils';
import {Button, InputBox, Label, Loader} from '../../components';
import {useNavigation} from '@react-navigation/core';
import ApiService, {API} from '../../utils/ApiService';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';

const Signup = () => {
  const navigation = useNavigation();

  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const [loader, setLoader] = useState(false);

  const data = {
    username: name,
    mobileNumber: mobile,
    password: password,
    email: email,
    role: ['mod', 'user'],
    profession: 'Farmer',
    latitude: 16.216,
    longitude: 77.3566,
    marketName: '',
    districtName: '',
    stateName: '',
    preferredCrops: '',
  };

  const OnSignup_press = () => {
    setLoader(true);

    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .post(
        'https://246b-2603-8081-1800-f423-d131-6594-b2b7-e578.ngrok.io/api/auth/signup',
        data,
        {
          headers,
        },
      )
      .then(response => {
        if (response.status === 200) {
          console.log(JSON.stringify(response.data, null, 4));

          navigation.navigate('Login');

          setLoader(false);

          toast.show('Successfully registred', {
            type: 'success',
            placement: 'bottom',
            duration: 2000,
            animationType: 'zoom-in',
          });
        }
      })
      .catch(error => {
        console.log(error.response.data.message);

        toast.show(error.response.data.message, {
          type: 'danger',
          placement: 'bottom',
          duration: 2000,
          animationType: 'zoom-in',
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={images.background} style={styles.container}>
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
          <InputBox value={name} onChangeText={value => setName(value)} />

          <Label title="Email" style={styles.title} />
          <InputBox value={email} onChangeText={value => setEmail(value)} />

          <Label title="Mobile" value={mobile} style={styles.title} />
          <InputBox onChangeText={value => setMobile(value)} />

          <Label title="password" value={password} style={styles.title} />
          <InputBox onChangeText={value => setPassword(value)} />

          <Button
            title="Sign Up"
            style={styles.btn}
            titleStyle={styles.btnTxt}
            onPress={OnSignup_press}
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

      {loader && <Loader />}
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
