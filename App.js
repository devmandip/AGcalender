import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { HomeScreen } from './src/screens/home';
import { NavigationContainer } from '@react-navigation/native';


const App = () => {
    return (
        <NavigationContainer>
            <HomeScreen />
        </NavigationContainer>
    );
};

export default App;

const styles = StyleSheet.create({});
