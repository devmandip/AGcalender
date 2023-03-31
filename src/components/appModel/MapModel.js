import {
  FlatList,
  Image,
  Linking,
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
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

import {SearchBar} from '../../screens/home/components';
import {Label, Title} from '../Label';
import {cropList} from '../../dummyData/Veg';

const MapModal = props => {
  const {isVisible, close} = props;
  const [cropsList, setCropList] = useState([]);
  const [searchtxt, setSearch] = useState('');

  useEffect(() => {
    setCropList(cropList);
  }, []);

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
        <View style={styles.header}>
          <Title title="Crop nam select." />
          <Icon
            name="x"
            size={scale(22)}
            color={theme.colors.black}
            onPress={() => close()}
            // style={styles.closeIcon}
          />
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}></MapView>
        </View>
      </View>
    </Modal>
  );
};

export default MapModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    // flexDirection: 'column',
    // justifyContent: 'space-around',
    paddingVertical: scale(20),
    backgroundColor: theme.colors.white,
    zIndex: 111,
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
