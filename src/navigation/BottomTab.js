import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from './HomeStack';
import Feather from 'react-native-vector-icons/Feather'
import ProfileStack from './ProfileStack';
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
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                        ? 'calendar'
                        : 'calendar';
                } else if (route.name === 'Profile') {
                    iconName = focused
                        ? 'user'
                        : 'user';
                }
                return <Feather name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'white',
            tabBarStyle: {
                backgroundColor: '#56AB2F',
            },
            tabBarLabel: () => { return null },
        })}>
            <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

export default BottomTab
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
