import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import {images, scale, theme} from '../../utils';
import {Button, InputBox, Label} from '../../components';
import {useNavigation} from '@react-navigation/core';
import {useToast} from 'react-native-toast-notifications';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ApiList} from '../../api/ApiList';
import {postServiceCall} from '../../api/Webservice';

const Signup = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);
  const toast = useToast();

  const ToastMessage = (message, type) => {
    toast.show(message, {
      type: type === undefined ? 'normal' : type,
      placement: 'bottom',
      duration: 1000,
      animationType: 'zoom-in',
    });
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProff, setSelectedProff] = useState('');
  const [showProff, setShowProff] = useState(false);
  const [proffList, setProffList] = useState([
    {
      id: '1',
      tag: 'Farmer (Cultivator)',
    },
    {
      id: '2',
      tag: 'FPO - Farmer Producer Organisations',
    },
    {
      id: '3',
      tag: 'APMC Traders & Comission Agents',
    },
    {
      id: '4',
      tag: 'Distributor/Exporter/Retailer',
    },
    {
      id: '5',
      tag: 'Agro/Food Processing Industries',
    },
    {
      id: '6',
      tag: 'Transport/ Logistics Services',
    },
    {
      id: '7',
      tag: 'Warehouse/ Cold-Storage Services',
    },
    {
      id: '8',
      tag: 'Others (Specify your profession)',
    },
  ]);
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const [loader, setLoader] = useState(false);

  const OnSignup_press = async () => {
    if (name === '') {
      ToastMessage('Username is required', 'danger');
    }
    // else if (email === '') {
    //   ToastMessage('Email is required', 'danger');
    // }
    else if (mobile === '') {
      ToastMessage('Mobile number is required', 'danger');
    }
    // else if (password === '') {
    //   ToastMessage('Password is required', 'danger');
    // }
    else {
      setLoader(true);
      try {
        var params = {
          username: name,
          mobileNumber: mobile,
          role: ['mod', 'user'],
          profession: selectedProff,
          latitude: global.currentLocation?.latitude ?? '',
          longitude: global.currentLocation?.longitude ?? '',
          marketName: '',
          districtName: '',
          stateName: '',
          preferredCrops: '',
        };
        postServiceCall(ApiList.SING_UP, params, true)
          .then(async responseJson => {
            if (responseJson?.data != '') {
              ToastMessage('successfully registred', 'success');
              navigation.navigate('Login');
              setLoader(false);
            }
            setLoader(false);
          })
          .catch(error => {
            setLoader(false);
          });
      } catch (error) {
        console.log(error);
        setLoader(false);
        ToastMessage(
          error === undefined ? 'something went wrong !' : error,
          'danger',
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={images.background} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={images.Logo} style={styles.logoStyle} />
          <Label title="  Harvesting calendar" style={styles.txt} />
        </View>
        <Label title="Signup " style={styles.loginwith} />
        {/* <View style={styles.loginView}>
          <Image source={images.google} style={styles.loginLogo} />
          <Image source={images.fb} style={styles.loginLogo} />
          <Image source={images.linkedin} style={styles.loginLogo} />
        </View>
        <View style={styles.orView}>
          <View style={styles.line} />
          <Label title="Or" style={styles.or} />
          <View style={styles.line} />
        </View> */}
        <Icon
          name="user-circle-o"
          size={scale(60)}
          color={theme.colors.white}
          style={{alignSelf: 'center', marginTop: scale(8)}}
          onPress={() => {}}
        />
        <KeyboardAwareScrollView>
          <View style={styles.contactForm}>
            <Label title="Name" style={styles.title} />
            <InputBox value={name} onChangeText={value => setName(value)} />

            {/* <Label title="Email" style={styles.title} />
            <InputBox value={email} onChangeText={value => setEmail(value)} /> */}

            <Label title="Mobile" style={styles.title} />
            <InputBox
              keyboardType="numeric"
              maxLength={10}
              value={mobile}
              onChangeText={value => setMobile(value)}
            />
            <Label title="Profession" style={styles.title} />
            <TouchableOpacity
              onPress={() => {
                setShowProff(!showProff);
              }}>
              <InputBox
                editable={false}
                keyboardType="numeric"
                maxLength={10}
                value={selectedProff}
                onChangeText={value => setMobile(value)}
              />
            </TouchableOpacity>
            <ScrollView
              display={showProff ? 'flex' : 'none'}
              nestedScrollEnabled
              style={{
                top: -10,
                marginHorizontal: scale(5),
                height: 200,
              }}
              contentContainerStyle={{
                overflow: 'hidden',
                borderBottomLeftRadius: scale(9),
                borderBottomRightRadius: scale(9),
              }}>
              {proffList?.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setShowProff(false);
                      setSelectedProff(item?.tag);
                    }}
                    style={{
                      padding: 10,
                      backgroundColor: theme.colors.white,
                    }}>
                    <Text>{item.tag}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            {/* <Label title="Password" value={password} style={styles.title} />
            <InputBox
              secureTextEntry
              value={password}
              onChangeText={value => setPassword(value)}
            /> */}

            {loader ? (
              <ActivityIndicator size="large" color={theme.colors.white} />
            ) : (
              <Button
                title="Sign Up"
                style={styles.btn}
                titleStyle={styles.btnTxt}
                onPress={OnSignup_press}
              />
            )}

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
        </KeyboardAwareScrollView>
      </ImageBackground>

      {/* {loader && <Loader />} */}
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
