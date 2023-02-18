import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default HomeStack
