import {StyleSheet} from 'react-native';
import React from 'react';
import {Login, Signup} from '../index';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={Signup} />
    </Stack.Navigator>
  );
};

export default LoginStack;
