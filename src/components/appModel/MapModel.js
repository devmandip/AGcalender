import {
  FlatList,
  Image,
  Linking,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale, theme} from '../../utils';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/core';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';

import {SearchBar} from '../../screens/home/components';
import {Label, Title} from '../Label';
import {cropList} from '../../dummyData/Veg';

const MapModal = props => {
  const {isVisible, close} = props;
  const [cropsList, setCropList] = useState([]);
  const [searchtxt, setSearch] = useState('');
  const [position, setPosition] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    setCropList(cropList);
    (async () => {
      await requestLocationPermission();
    })();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        GetLocation();
        // alert('You can use the location');
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const GetLocation = () => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      console.log(crd);
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setRegion({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }).catch(err => {
      console.log(err);
    });
  };

  // const useGoogleGetAddress = () => {
  //   fetch(
  //     'https://maps.googleapis.com/maps/api/geocode/json?address=' +
  //       crd.latitude +
  //       ',' +
  //       crd.longitude +
  //       '&key=' +
  //       'AIzaSyDENJOf97pAC3V97wgCXHxBr8YSLDeijDc',
  //   )
  //     .then(response => response.json())
  //     .then(responseJson => {
  //       const place = JSON.stringify(
  //         responseJson?.results[0]?.formatted_address,
  //       )?.replace(/"/g, '');

  //       console.log(place);
  //     });
  // };

  return (
    <Modal
      backdropOpacity={0.4}
      visible={isVisible}
      onRequestClose={() => {
        close();
      }}
      animationIn="slideOutLeft"
      animationOut="slideInLeft"
      animationInTiming={0.5}
      style={{width: '100%', margin: 0}}>
      <View style={styles.modalBackground}>
        <View style={{flex: 1}}>
          <View
            style={{
              zIndex: 1,
              right: 20,
              top: 20,
              position: 'absolute',
            }}>
            <Icon
              name="x"
              size={scale(30)}
              color={theme.colors.white}
              onPress={() => close()}
              // style={styles.closeIcon}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              close(position);
            }}
            style={{
              zIndex: 1,
              bottom: 20,
              backgroundColor: theme.colors.primary,
              position: 'absolute',
              padding: scale(10),
              paddingHorizontal: scale(20),
              alignSelf: 'center',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: scale(15),
                color: theme.colors.white,
              }}>
              {'Save Location'}
            </Text>
          </TouchableOpacity>
          {position != '' && (
            <MapView
              mapType="satellite"
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              onRegionChangeComplete={e => {
                setRegion({
                  latitude: e.latitude,
                  longitude: e.longitude,
                  latitudeDelta: e.latitudeDelta,
                  longitudeDelta: e.longitudeDelta,
                });
              }}
              onPress={e => {
                console.log('e>>>> ', e);
                setPosition({
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                });
              }}
              region={region}>
              <Marker
                coordinate={{
                  latitude: Number(position?.latitude),
                  longitude: Number(position?.longitude),
                }}></Marker>
            </MapView>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default MapModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    backgroundColor: theme.colors.white,
  },
  label: {color: theme.colors.black, fontSize: scale(14), fontWeight: '500'},
  activityIndicatorWrapper: {
    backgroundColor: theme.colors.white,
    // height: theme.SCREENHEIGHT * 0.2,
    width: theme.SCREENWIDTH * 0.92,
    borderRadius: scale(10),
    // paddingVertical:scale(20),
    padding: scale(10),
    zIndex: 111,
    marginTop: -theme.SCREENHEIGHT * 0.01,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
