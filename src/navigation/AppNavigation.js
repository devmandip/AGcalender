import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Signup, Login, WhyHarvestingCalendar, ContactUs} from '../screens';
import BottomTab from './BottomTab';
import LoginStack from '../screens/auth/AuthStack';
import {useSelector} from 'react-redux';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

const MianStack = () => {
  const isLogin = useSelector(state => state.UserReducer.login);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  useEffect(() => {
    requestUserPermission();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLogin ? 'Tab' : 'authStack'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="authStack"
          component={LoginStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Tab"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Static" component={WhyHarvestingCalendar} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MianStack;
