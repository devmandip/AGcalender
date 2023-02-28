import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Signup, Login} from '../screens';
import BottomTab from './BottomTab';
import LoginStack from '../screens/auth/AuthStack';

const Stack = createNativeStackNavigator();

const MianStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen
          name="authStack"
          component={LoginStack}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Tab"
          component={BottomTab}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MianStack;
