import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import Feather from 'react-native-vector-icons/Feather';
import ProfileStack from './ProfileStack';
import ExitApp from 'react-native-exit-app';

import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {scale, theme} from '../utils';
import {Platform, SafeAreaView, BackHandler, View, Alert} from 'react-native';
import {ContactUs, Profile, TermsAndConditions} from '../screens';
import {Title} from '../components';
import AddCropStack from './AddCropStack';
import {YardVew} from '../screens/home/components';
import {useSelector} from 'react-redux';
import axios from 'axios';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, []);
  const handleBackPress = () => {
    Alert.alert(
      'Confirm Exit',
      'Are you sure you want to exit the app?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Exit', onPress: () => ExitApp.exitApp()},
      ],
      {cancelable: false},
    );

    return true; // Return true to prevent default back button action
  };
  return (
    <Tab.Navigator
      initialRouteName="Rupee"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarActiveTintColor: '#b9ffb6',
        tabBarInactiveTintColor: theme.colors.white,
        tabBarActiveBackgroundColor: theme.colors.green,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? scale(85) : scale(55),
          position: 'absolute',
          backgroundColor: theme.colors.primary,
          paddingVertical: Platform.OS === 'ios' ? scale(5) : scale(5),
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: scale(12),
          // color: theme.colors.white,
        },
      }}>
      <Tab.Screen
        name="Rupee"
        component={YardVew}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome
                name="rupee"
                size={scale(25)}
                color={focused ? '#b9ffb6' : theme.colors.white}
              />
            );
          },
          tabBarLabel: 'APMC Rate',
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="calendar"
                size={scale(25)}
                color={focused ? '#b9ffb6' : theme.colors.white}
              />
            );
          },
          tabBarLabel: 'Calender',
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddCropStack}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="add-circle-outline"
                size={scale(25)}
                color={focused ? '#b9ffb6' : theme.colors.white}
              />
            );
          },
          tabBarLabel: 'Add Crop',
        }}
      />
      <Tab.Screen
        name="User"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Feather
                name="user"
                size={scale(25)}
                color={focused ? '#b9ffb6' : theme.colors.white}
              />
            );
          },
          tabBarLabel: 'Profile',
        }}
      />

      <Tab.Screen
        name="Share"
        component={TermsAndConditions}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Feather
                name="share-2"
                size={scale(25)}
                color={focused ? '#b9ffb6' : theme.colors.white}
              />
            );
          },
          tabBarLabel: 'Share',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
