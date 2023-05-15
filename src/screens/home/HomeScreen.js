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
import {CalenderView, Header, PostSection, Story} from './components';
import {DrawerModal, SelectCropModel} from '../../components';
import {theme} from '../../utils';
import Toast from '../../components/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoriesData, getCropData} from '../../redux/Actions/UserActions';
import {useFocusEffect, useIsFocused} from '@react-navigation/core';
import Geolocation from '@react-native-community/geolocation';
import {getServiceCall} from '../../api/Webservice';
import {ApiList} from '../../api/ApiList';
import moment from 'moment';

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
  const [selectedCate, setSelectedCate] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.UserReducer);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        dispatch(getCropData(selectedCate?.id));
        dispatch(getCategoriesData());
        await requestLocationPermission();
      })();
    }, []),
  );

  useEffect(() => {
    callListApi(global.currentLocation, moment().format('DD/MM/YYYY'));
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'AgMart Celender',
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
      const lat = farmLocation.latitude;
      const long = farmLocation.longitude;
      var params = {
        cropName: selectedCrop,
        latitude: lat,
        longitude: long,
        radius: 1000,
        harvestingDate: moment(date).format('DD/MM/YYYY') ?? '', //"22/03/2023"
      };
      getServiceCall(ApiList.ADD_CROP, params)
        .then(async responseJson => {
          if (responseJson?.data != '') {
            setListData(responseJson?.data?.data);
          }
        })
        .catch(error => {});
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = event => {
    let yOffset = event.nativeEvent.contentOffset.y / 1;
    setScrollPosition(yOffset);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.white}}>
      <SelectCropModel
        category={true}
        selectedItem={item => {
          setSelectedCate(item);
          dispatch(getCropData(item?.id));
        }}
        listData={userReducer?.categoryList}
        isVisible={isFocus}
        close={() => setIsFocus(false)}
      />
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onScroll={event => handleScroll(event)}>
        <View style={styles.container}>
          <Header
            onRightPress={() => {
              setIsFocus(true);
            }}
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
            ListEmptyComponent={
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 100,
                }}>
                <Text>{'No data found'}</Text>
              </View>
            }
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
