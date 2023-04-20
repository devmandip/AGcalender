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

import {SearchBar} from '../../screens/home/components';
import {Label, Title} from '../Label';

const DrawerModal = props => {
  const {isVisible, close} = props;
  const [cropsList, setCropList] = useState([]);
  const [searchtxt, setSearch] = useState('');

  useEffect(() => {
    setCropList(props.listData);
  }, []);

  const navigation = useNavigation();
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.renderItem_container} key={index}>
        <TouchableOpacity
          onPress={() => {
            close();
            props.selectedItem(item)
            //  setCategory(index);
          }}
          style={styles.cropcard}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Triticum_aestivum_-_Kia_Gardens.jpg/220px-Triticum_aestivum_-_Kia_Gardens.jpg',
            }}
            style={styles.renderItem_img}
          />
          <Label title={item.name} />
        </TouchableOpacity>
      </View>
    );
  };
  const handleSearch = text => {
    if (text) {
      const newData = props.listData.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setCropList(newData);
      setSearch(text);
    } else {
      setCropList(props.listData);
      setSearch(text);
    }
  };
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Title title="Crop nam select." />
          <Icon
            name="x"
            size={scale(22)}
            color={theme.colors.black}
            onPress={() => close()}
            // style={styles.closeIcon}
          />
        </View>
        <SearchBar
          placeholder="Search Crop"
          style={{
            width: theme.SCREENWIDTH * 0.9,
            marginTop: scale(10),
            alignSelf: 'center',
            marginVertical: scale(5),
          }}
          value={searchtxt}
          onChangeText={txt => {
            handleSearch(txt);
          }}
          inputStyle={{
            fontFamily: theme.fonts.InterMedium,
            width: '100%',
            fontSize: scale(13),
          }}
        />
        <FlatList
          contentContainerStyle={{width: '93%', alignSelf: 'center'}}
          data={cropsList}
          renderItem={renderItem}
          // horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Modal>
  );
};

export default DrawerModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: scale(20),
    backgroundColor: 'rgba(0,0,0,0.7)',
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
    flex: 1,
    padding: scale(5),
    // borderWidth: 1,
    backgroundColor: theme.colors.white,
    // borderTopRightRadius: scale(25),
    // borderBottomRightRadius: scale(25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    // alignItems: 'center',
  },
  textButton: {
    flexDirection: 'row',
    marginVertical: scale(10),
    alignItems: 'center',
  },
  btnText: {
    marginLeft: scale(10),
    fontWeight: '600',
    fontFamily: theme.fonts.josefinSans,
    color: theme.colors.black,
  },
  link: {
    marginVertical: scale(10),
    color: theme.colors.linkColor,
  },

  header: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: scale(20),
    paddingVertical: scale(10),
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: scale(13),
    borderBottomWidth: scale(0.6),
  },
  renderItem_img: {
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
  },
  cropcard: {
    borderColor: theme.colors.green,
    flexDirection: 'row',
    borderWidth: scale(1),
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(3),
    margin: scale(2),
    paddingHorizontal: scale(10),

    borderRadius: scale(3),
  },
  renderItem_container: {},
});
