import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  SafeAreaView,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CalenderView, Header, PostSection, Story, YardVew} from './components';
import Posts from '../../dummyData/Posts';
import {DrawerModal, Loader} from '../../components';
import {theme} from '../../utils';
import Toast from '../../components/Toast';
import MapModal from '../../components/appModel/MapModel';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoriesData} from '../../redux/Actions/UserActions';
import {useIsFocused} from '@react-navigation/core';
import ApiService, {API} from '../../utils/ApiService';
import Geolocation from '@react-native-community/geolocation';

const renderItem = ({item}) => {
  return (
    <PostSection
      postImages={item.postedImages}
      proicePic={item.profileImg}
      name={item.cropName}
      description={item.description}
      view_count={item.ViewCount}
      like_count={item.likeCount}
    />
  );
};

const HomeScreen = () => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [drawerModal, setDrawerModel] = useState(false);

  const [listData, setListData] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');

  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.UserReducer);
  const isFocuse = useIsFocused();
  useEffect(() => {
    dispatch(getCategoriesData());
  }, [isFocuse]);

  useEffect(() => {
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
      global.currentLocation = crd;
    }).catch(err => {
      console.log(err);
    });
  };


  const callListApi = async farmLocation => {
    const options = {
      queries: {
        cropName: selectedCrop,
        latitude: farmLocation?.latitude,
        longitude: farmLocation?.longitude,
        radius: 1000,
      },
    };

    try {
      const response = await ApiService.get(API.listing, options);

      if (response) {
        setListData(response);
        // setListData(response);
        // navigation.navigate('User');
        // setLoader(false);
        // ToastMessage('successfully submit', 'success');
      } else {
        // setLoader(false);
      }
    } catch (error) {
      console.log(error.response);
      // ToastMessage(
      //   error.response.data.message === undefined
      //     ? 'something went wrong !'
      //     : error.response.data.message,
      //   'danger',
      // );
    }
  };

  const handleScroll = event => {
    // alert('call');
    let yOffset = event.nativeEvent.contentOffset.y / 1;
    setScrollPosition(yOffset);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.white}}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onScroll={event => handleScroll(event)}>
        <View style={styles.container}>
          <Header
            basket
            onPressMenu={() => {
              setDrawerModel(true);
            }}
          />
          <Story
            selectPress={item => {
              setSelectedCrop(item?.name);
            }}
            listData={userReducer?.categoryList}
          />
          <CalenderView
            callListAPi={location => {
              callListApi(location);
            }}
            cropName={selectedCrop}
            hideCal
            scrollPosition={scrollPosition}
          />
          <FlatList
            nestedScrollEnabled={true}
            data={listData}
            renderItem={renderItem}
            keyExtractor={(item, index) => item?.id}
          />
        </View>
        <DrawerModal
          isVisible={drawerModal}
          close={() => {
            setDrawerModel(false);
          }}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          Toast.show('this is long text', Toast.LONG);
        }}>
        <Text>press me</Text>
      </TouchableOpacity>
      {/* <Loader /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 60,
  },
});
