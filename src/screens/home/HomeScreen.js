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
import React, {useEffect, useCallback, useState} from 'react';
import {CalenderView, Header, PostSection, Story, YardVew} from './components';
import Posts from '../../dummyData/Posts';
import {DrawerModal, Loader} from '../../components';
import {theme} from '../../utils';
import Toast from '../../components/Toast';
import MapModal from '../../components/appModel/MapModel';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoriesData, getCropData} from '../../redux/Actions/UserActions';
import {useFocusEffect, useIsFocused} from '@react-navigation/core';
import ApiService, {API} from '../../utils/ApiService';
import Geolocation from '@react-native-community/geolocation';

const renderItem = ({item}) => {
  return (
    <PostSection
      postImages={[
        {
          id: 5,
          uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
          type: 'image',
        },
        {
          id: 8,
          uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
          type: 'image',
        },
      ]}
      proicePic={require('../../assets/Images/postImages/profileImage.png')}
      name={item.username}
      description={
        'Srinivas rao from Manvi cultivating Supreme varietyChilli in 4 ac. Expected to harvest 20 Quintalson/after 29-01-23'
      }
      view_count={'221'}
      like_count={'167'}
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
    dispatch(getCropData(userReducer));
    dispatch(getCategoriesData(userReducer));
  }, [isFocuse]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await requestLocationPermission();
      })();
    }, []),
  );

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

  const callListApi = async (farmLocation, date) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        'Bearer ' + userReducer?.userDetails?.accessToken,
      );

      var raw = '';

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const lat = farmLocation.latitude;
      const long = farmLocation.longitude;

      fetch(
        `https://agmart.ngrok.app/api/listing?cropName=${selectedCrop}&latitude=${lat}&longitude=${long}&radius=1000&harvestingDate=17/05/2023`,
        requestOptions,
      )
        .then(response => response.json())
        .then(response => {
          setListData(response?.data);
        })
        .catch(error => console.log('error', error));
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
            listData={userReducer?.cropsList}
          />
          <CalenderView
            callListAPi={(location, date) => {
              callListApi(location, date);
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
