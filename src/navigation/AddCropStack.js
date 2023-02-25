import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddCrop from '../screens/addCrop/AddCrop';
import {Camera, ImageView} from '../screens/addCrop/addCrop_components';

const Stack = createNativeStackNavigator();

const AddCropStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddCrop"
        component={AddCrop}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
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

export default AddCropStack;
