import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {scale, theme} from '../utils';
import {Platform, Text, View} from 'react-native';
import {Profile} from '../screens';

const Tab = createBottomTabNavigator();

const Comman = () => {
  return (
    <View>
      <Text>testing data </Text>
    </View>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      // initialRouteName="RISTORANTI"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.purpal,
        tabBarInactiveTintColor: '#555',

        tabBarStyle: {
          height: scale(55),
          position: 'absolute',
          backgroundColor: theme.colors.primary,
          paddingTop: Platform.OS === 'ios' ? scale(5) : scale(0),
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
          fontSize: scale(10),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Comman}
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
        }}
      />

      <Tab.Screen
        name="Rupee"
        component={Comman}
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
        }}
      />

      <Tab.Screen
        name="Add"
        component={Comman}
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
        }}
      />

      <Tab.Screen
        name="Share"
        component={Comman}
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
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
