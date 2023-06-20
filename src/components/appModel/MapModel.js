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
import {images, scale, theme} from '../../utils';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/core';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SearchBar} from '../../screens/home/components';
import {Label, Title} from '../Label';
import {cropList} from '../../dummyData/Veg';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const MapModal = props => {
  const {isVisible, close} = props;
  const [cropsList, setCropList] = useState([]);
  const [searchtxt, setSearch] = useState('');
  const [position, setPosition] = useState('');
  const [region, setRegion] = useState('');
  const [userLocation, setUserLocation] = useState('');

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
    try {
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
      });
    } catch (error) {
      console.log(error);
    }
  };

  const useGoogleGetAddress = data => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        data.latitude +
        ',' +
        data.longitude +
        '&key=' +
        'AIzaSyDENJOf97pAC3V97wgCXHxBr8YSLDeijDc',
    )
      .then(response => response.json())
      .then(responseJson => {
        const place = JSON.stringify(
          responseJson?.results[0]?.address_components[4]?.long_name,
        )?.replace(/"/g, '');
        const address = JSON.stringify(
          responseJson?.results[0]?.formatted_address,
        )?.replace(/"/g, '');
        setUserLocation({place, address});
        console.log(
          'name of location ',
          responseJson?.results[0]?.formatted_address,
        );
      });
  };

  const logoImg = '../../assets/Images//logo.png';

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
              position: 'absolute',
              zIndex: 1,
              right: 0,
              left: 0,
              justifyContent: 'space-between',
              alignItems: 'center',
              top: scale(10),
              flexDirection: 'row',
            }}>
            <View style={{width: '15%', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  close();
                }}>
                <Image source={require(logoImg)} style={styles.logoImg_style} />
              </TouchableOpacity>
            </View>
            <View style={{width: '15%', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => {}}>
                <Fontisto
                  name="shopping-basket"
                  size={scale(22)}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              zIndex: 1,
              right: 0,
              left: 0,
              top: scale(5),
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
            }}>
            <View
              style={{
                width: '70%',
              }}>
              <GooglePlacesAutocomplete
                styles={{
                  container: {
                    flex: 0,
                  },
                  description: {
                    color: '#000',
                    fontSize: 16,
                  },
                }}
                fetchDetails={true}
                onPress={(data, details = null) => {
                  setRegion({
                    latitude: details?.geometry?.location?.lat,
                    longitude: details?.geometry?.location?.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  });
                  setPosition({
                    latitude: details?.geometry?.location?.lat,
                    longitude: details?.geometry?.location?.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  });
                }}
                onFail={error => console.log(error)}
                onNotFound={() => console.log('no results')}
                placeholder="Search for area, Street name..."
                query={{key: 'AIzaSyDENJOf97pAC3V97wgCXHxBr8YSLDeijDc'}}
                listEmptyComponent={() => (
                  <View style={{flex: 1, backgroundColor: 'white'}}>
                    <Text>No results were found</Text>
                  </View>
                )}
              />
            </View>
          </View>
          <View
            style={{
              zIndex: 1,
              bottom: 0,
              right: 0,
              left: 0,
              position: 'absolute',
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                marginHorizontal: scale(20),
                marginVertical: scale(10),
              }}
              onPress={() => {
                GetLocation();
              }}>
              <MaterialCommunityIcons
                name="crosshairs-gps"
                size={scale(30)}
                color={theme.colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                marginHorizontal: scale(20),
                marginVertical: scale(10),
              }}
              onPress={() => {}}>
              <Fontisto
                name="compass-alt"
                size={scale(30)}
                color={theme.colors.white}
              />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: theme.colors.white,
                borderTopEndRadius: 18,
                borderTopStartRadius: 18,
                padding: scale(10),
                paddingHorizontal: scale(20),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: scale(10),
                }}>
                <Image source={images.pin} style={styles.icon} />
                <View style={{top: scale(-5)}}>
                  <Text>{userLocation?.place}</Text>
                  <Text>{userLocation?.address}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  close(position);
                }}
                style={{
                  backgroundColor: theme.colors.primary,
                  padding: scale(10),
                  paddingHorizontal: scale(20),
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
                  {'Confirm location'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {position != '' && (
            <MapView
              showsMyLocationButton={true}
              mapType="hybrid"
              showsCompass={true}
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              onRegionChangeComplete={e => {
                setRegion({
                  latitude: e.latitude,
                  longitude: e.longitude,
                  latitudeDelta: e.latitudeDelta,
                  longitudeDelta: e.longitudeDelta,
                });
                setPosition({
                  latitude: e.latitude,
                  longitude: e.longitude,
                  latitudeDelta: e.latitudeDelta,
                  longitudeDelta: e.longitudeDelta,
                });
                useGoogleGetAddress(e);
              }}
              region={region}>
              <Marker
                coordinate={{
                  latitude: Number(region?.latitude),
                  longitude: Number(region?.longitude),
                }}
                anchor={{x: 0.5, y: 0.5}}></Marker>
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
  logoImg_style: {
    height: 35,
    width: 35,
  },
  icon: {
    width: scale(15),
    height: scale(15),
    marginEnd: scale(10),
  },
});
