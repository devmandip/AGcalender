import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Platform,
  Image,
  Pressable,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images, scale, theme} from '../../../utils';
import Header from './Header';
import Story from './Story';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {getServiceCall} from '../../../api/Webservice';
import {ApiList} from '../../../api/ApiList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Geolocation from '@react-native-community/geolocation';
import {DrawerModal, Loader} from '../../../components';

const Yard_list = props => {
  const {date, landMark, km, state, product, weight, Rs, up, down} = props;

  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <View
        style={[
          styles.headerView,
          {alignItems: 'flex-start', borderLeftWidth: 1, borderBottomWidth: 1},
        ]}>
        <Text style={styles.yard_txt}>{moment(date).format('DD-MM-YYYY')}</Text>
        <Text style={[styles.header_txt, {color: '#56AB2F'}]}>{landMark}</Text>
        <Text style={styles.yard_txt}>
          {km} Km, {state}
        </Text>
      </View>
      <View
        style={[styles.headerView, {borderLeftWidth: 1, borderBottomWidth: 1}]}>
        <Text style={styles.yard_txt}>{product}</Text>
        <Text style={styles.yard_txt}> {weight} </Text>
      </View>
      <View
        style={[
          styles.headerView,
          {borderLeftWidth: 1, borderBottomWidth: 1, borderRightWidth: 1},
        ]}>
        <Text style={styles.yard_txt}>Rs.{up}/Q</Text>
        <View style={{alignItems: 'center'}}>
          {/* <AntDesign
            name="arrowdown"
            size={scale(15)}
            style={{right: scale(3)}}
            color="red"
          /> */}
          <Text style={{color: 'red', fontSize: scale(10)}}>
            {'Down '}
            <Text style={[styles.yard_txt, {textAlign: 'center', flex: 1}]}>
              - {down}
            </Text>
          </Text>

          <Text style={{color: '#56AB2F', fontSize: scale(10)}}>
            {'Up '}
            <Text style={[styles.yard_txt, {textAlign: 'center', flex: 1}]}>
              - {up}
            </Text>
          </Text>
          {/* <AntDesign
            name="arrowup"
            size={scale(15)}
            style={{left: scale(3)}}
            color="#56AB2F"
          /> */}
        </View>
      </View>
    </View>
  );
};

const renderItem = ({item}) => {
  return (
    <View>
      <Yard_list
        date={item.arrivalDate}
        landMark={item?.districtName}
        state={item?.state}
        km={item.distance}
        product={item.variety}
        weight={item?.arrivals + ' ' + item?.arrivals_unit}
        Rs={item?.price_unit}
        up={item.min_price}
        down={item.max_price}
      />
    </View>
  );
};

var page = 1;
var limit = 10;

const YardVew = () => {
  const [yardData, setYardData] = useState([]);

  useEffect(() => {
    (async () => {
      await requestLocationPermission();
      setTimeout(() => {
        getYardDetailsByID('refresh');
      }, 1000);
    })();
  }, []);

  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.UserReducer);

  const [tempCropList, setTempCropList] = useState(userReducer?.cropsList);
  const [search, setSearch] = useState('');
  const [yardFilter, setYardFilter] = useState(false);
  const [modaPFilter, setModaPFilter] = useState(false);
  const [arrivalQFilter, setArrivalQFilter] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState('0');
  const [loadmore, setLoadmore] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [drawerModal, setDrawerModel] = useState(false);
  const [load, setLoad] = useState(false);
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

  const dynamicOrder = () => {
    switch (sortBy) {
      case 'distance':
        return !yardFilter ? 'asc' : 'desc';
      case 'arrivals':
        return !arrivalQFilter ? 'asc' : 'desc';
      case 'modalPrice':
        return !modaPFilter ? 'asc' : 'desc';
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getYardDetailsByID('refresh');
    }, 1000);
  }, [sortBy, modaPFilter, yardFilter, arrivalQFilter]);

  const getYardDetailsByID = async (
    type = '',
    id = selectedItemId,
    filterByt = sortBy,
    sortOrder = dynamicOrder() ?? '',
  ) => {
    if (type == 'refresh') {
      page = 1;
      setYardData([]);
      setTotalCount(0);
    }
    try {
      var params = {
        cropId: id,
        latitude: global.currentLocation?.latitude,
        longitude: global.currentLocation?.longitude,
        radius: 1000000,
        page: page,
        size: limit,
        sortBy: filterByt,
        sortOrder: sortOrder,
      };
      setLoad(true);
      getServiceCall(ApiList.MARKET_RATES, params)
        .then(async responseJson => {
          setLoad(false);
          if (responseJson?.data != '') {
            setTotalCount(responseJson?.data?.totalCount);
            if (type == 'refresh') {
              setYardData(responseJson?.data.data);
            } else {
              const mergeData = [...yardData, ...responseJson?.data?.data];
              setYardData(mergeData);
            }
            setLoadmore(false);
          }
          setLoadmore(false);
        })
        .catch(error => {
          setLoadmore(false);
          setLoad(false);
        });
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  const Yard_header = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: scale(12),
          borderBottomWidth: 3,
          borderBottomColor: 'lightgray',
        }}>
        <Pressable
          onPress={() => {
            setSortBy('distance');
            setYardFilter(!yardFilter);
          }}
          style={[
            styles.headerView,
            ,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderLeftWidth: 1,
              borderTopWidth: 1,
            },
          ]}>
          <Image source={images.map} style={styles.icon} />
          <Text style={styles.header_txt}>APMC Yard</Text>
          <AntDesign name={yardFilter ? 'arrowdown' : 'arrowup'} size={25} />
        </Pressable>
        <Pressable
          onPress={() => {
            setSortBy('arrivals');
            setArrivalQFilter(!arrivalQFilter);
          }}
          style={[
            styles.headerView,
            ,
            {
              flexDirection: 'row',
              borderLeftWidth: 1,
              borderTopWidth: 1,
            },
          ]}>
          <Image source={images.bullock} style={styles.icon} />
          <Text style={styles.header_txt}> Arrival Quantity </Text>
          <AntDesign
            name={arrivalQFilter ? 'arrowdown' : 'arrowup'}
            size={25}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            setSortBy('modalPrice');
            setModaPFilter(!modaPFilter);
          }}
          style={[
            styles.headerView,
            ,
            {
              flexDirection: 'row',
              borderLeftWidth: 1,
              borderTopWidth: 1,
              borderRightWidth: 1,
            },
          ]}>
          <Image source={images.ruppe} style={styles.icon} />
          <Text style={styles.header_txt}>
            Modal Price
            {/* <Text style={[styles.header_txt, {fontSize: scale(11)}]}>
              {' Min/max'}
            </Text> */}
          </Text>
          <AntDesign name={modaPFilter ? 'arrowdown' : 'arrowup'} size={25} />
        </Pressable>
      </View>
    );
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.length == 0) {
        setTempCropList(userReducer?.cropsList);
      } else {
        const newData = userReducer?.cropsList.filter(item => {
          const itemData = `${item.name.toUpperCase()}`;
          const textData = search.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setTempCropList(newData);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  const loadmoreHandler = (type = '') => {
    page = page + 1;
    setLoadmore(() => true, getYardDetailsByID('loadmore'));
  };

  const LoadmoreSpinner = () =>
    loadmore && (
      <View
        style={{
          height: scale(30),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator
          size="small"
          color={theme.colors.primary}
          animating={loadmore}
        />
      </View>
    );

  console.log(
    page + ' TOTAL PAGE ' + totalCount + '  YARD LENGTH ' + yardData.length,
  );

  return (
    <SafeAreaView>
      <Header
        onPressMenu={() => {
          setDrawerModel(true);
        }}
        value={search}
        onChangeText={text => {
          setSearch(text);
        }}
        hideFliiter={true}
      />
      <DrawerModal
        isVisible={drawerModal}
        close={() => {
          setDrawerModel(false);
        }}
      />
      <Story
        selectPress={item => {
          setYardData([]);
          setSelectedItemId(item?.id);
          getYardDetailsByID('refresh', item?.id);
        }}
        listData={tempCropList}
      />
      <View
        style={{
          height:
            Platform.OS === 'ios'
              ? theme.SCREENHEIGHT * 0.53
              : theme.SCREENHEIGHT * 0.57,
        }}>
        <View style={styles.container}>
          <Yard_header />
          <FlatList
            ListEmptyComponent={
              !load && (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: theme.SCREENHEIGHT * 0.6,
                    flex: 1,
                  }}>
                  <Text>{'No data found'}</Text>
                </View>
              )
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: scale(10)}}
            data={yardData}
            renderItem={renderItem}
            ListFooterComponent={LoadmoreSpinner}
            onEndReachedThreshold={0.05}
            onEndReached={() =>
              totalCount != 0 &&
              yardData.length < totalCount &&
              !loadmore &&
              loadmoreHandler()
            }
          />
        </View>
      </View>
      {/* {load && yardData.length === 0 && <Loader loading={load} />} */}
    </SafeAreaView>
  );
};

export default YardVew;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(5),
    margin: scale(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 1.62,
    backgroundColor: theme.colors.white,
    elevation: scale(2),
    borderRadius: scale(10),
    paddingBottom: scale(10),
  },
  icon: {
    width: scale(25),
    height: scale(25),
    resizeMode: 'contain',
  },
  headerView: {
    width: scale(108),
    height: scale(65),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lightgray',
    paddingHorizontal: scale(4),
    paddingVertical: scale(5),
  },
  header_txt: {
    flex: 1,
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  yard_txt: {
    color: 'black',
    fontSize: 13,
    fontWeight: '400',
    paddingVertical: scale(1),
  },
});
