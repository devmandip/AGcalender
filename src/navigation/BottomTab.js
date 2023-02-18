import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from './HomeStack';
import Feather from 'react-native-vector-icons/Feather'
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

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
