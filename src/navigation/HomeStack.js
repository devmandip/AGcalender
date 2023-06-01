import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens';
import {ImageView} from '../screens/addCrop/addCrop_components';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ImageView"
        component={ImageView}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
