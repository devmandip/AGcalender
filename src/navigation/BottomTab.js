import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import Feather from 'react-native-vector-icons/Feather';
import ProfileStack from './ProfileStack';

import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {scale, theme} from '../utils';
import {Platform, SafeAreaView, Text, View} from 'react-native';
import {ContactUs, Profile, TermsAndConditions} from '../screens';
import {Title} from '../components';
import AddCropStack from './AddCropStack';
import {YardVew} from '../screens/home/components';

const Tab = createBottomTabNavigator();

const Comman = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: theme.SCREENHEIGHT,
        }}>
        <Title title="Comeing soom" />
      </View>
    </SafeAreaView>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      // initialRouteName="User"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        // tabBarShowLabel: false,
        // tabBarActiveTintColor: theme.colors.green,
        tabBarInactiveTintColor: '#555',
        // tabBarActiveBackgroundColor: theme.colors.green,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? scale(85) : scale(50),
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
          color: theme.colors.white,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="calendar"
                size={scale(25)}
                color={theme.colors.white}
              />
            );
          },
          tabBarLabel: 'Calender',
        }}
      />

      <Tab.Screen
        name="Rupee"
        component={YardVew}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <FontAwesome
                name="rupee"
                size={scale(25)}
                color={theme.colors.white}
              />
            );
          },
          tabBarLabel: 'APMC Rate',
        }}
      />

      <Tab.Screen
        name="Add"
        component={AddCropStack}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Icon
                name="add-circle-outline"
                size={scale(25)}
                color={theme.colors.white}
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
                color={theme.colors.white}
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
                color={theme.colors.white}
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
