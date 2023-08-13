import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Signup, Login, WhyHarvestingCalendar, ContactUs} from '../screens';
import BottomTab from './BottomTab';
import LoginStack from '../screens/auth/AuthStack';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Notification from '../screens/Notification';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType, AndroidImportance} from '@notifee/react-native';
import {PermissionsAndroid} from 'react-native';
const Stack = createNativeStackNavigator();

const MianStack = () => {
  const [fcmtkn, setfcmtoken] = useState(null);
  console.log('fcmtkn >> ', fcmtkn);
  const isLogin = useSelector(state => state.UserReducer.login);
  async function requestUserPermission() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      const fcmToken = await messaging().getToken();
      setfcmtoken(fcmToken);
      if (fcmToken) {
        console.log('fcm token ', fcmToken);
      }
    }
  }
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          break;
        case EventType.PRESS:
          // navigation.navigate(NOTIFICATION_LIST);
          break;
      }
    });
  }, [fcmtkn]);
  useEffect(() => {
    requestUserPermission();
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onDisplayNotification(remoteMessage);
      // alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  async function onDisplayNotification(data) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    // Display a notification

    await notifee
      .displayNotification({
        title: data?.notification?.body,
        body: data?.notification?.title,
        vibrate: true,
        contentAvailable: true,
        android: {
          smallIcon: 'ic_launcher',
          channelId,
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
        },
      })
      .then(res => {
        console.log('resss >>> ', res);
      });
  }
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
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MianStack;
