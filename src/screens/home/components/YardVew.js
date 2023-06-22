import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Platform,
  Image,
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
const Yard_header = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: scale(12),
        borderBottomWidth: 3,
        borderBottomColor: 'lightgray',
      }}>
      <View
        style={[
          styles.headerView,
          ,
          {
            flexDirection: 'row',
            borderLeftWidth: 1,
            borderTopWidth: 1,
          },
        ]}>
        <Image source={images.map} style={styles.icon} />
        <Text style={styles.header_txt}>APMC Yard</Text>
      </View>
      <View
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
      </View>
      <View
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
      </View>
    </View>
  );
};

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
        <Text style={styles.yard_txt}>Rs, {Rs}/Q</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign
            name="arrowdown"
            size={scale(15)}
            style={{right: scale(3)}}
            color="red"
          />
          <Text style={styles.yard_txt}>
            {down} - {up}
          </Text>
          <AntDesign
            name="arrowup"
            size={scale(15)}
            style={{left: scale(3)}}
            color="#56AB2F"
          />
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

const YardVew = () => {
  const [yardData, setYardData] = useState([]);

  useEffect(() => {
    getYardDetailsByID();
  }, []);

  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.UserReducer);

  const getYardDetailsByID = async (id = '0') => {
    try {
      var params = {
        cropId: id,
        latitude: global.currentLocation?.latitude,
        longitude: global.currentLocation?.longitude,
        radius: 1000000,
      };
      getServiceCall(ApiList.MARKET_RATES, params)
        .then(async responseJson => {
          if (responseJson?.data != '') {
            setYardData(responseJson?.data.data);
          }
        })
        .catch(error => {});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      <Header hideFliiter={true} />
      <Story
        selectPress={item => {
          setYardData([]);
          getYardDetailsByID(item?.id);
        }}
        listData={userReducer?.cropsList}
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
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 100,
                }}>
                <Text>{'No data found'}</Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: scale(10)}}
            data={yardData}
            renderItem={renderItem}
          />
        </View>
      </View>
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
    width: scale(30),
    height: scale(30),
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
    fontSize: 16,
    fontWeight: '600',
  },
  yard_txt: {
    color: 'black',
    fontSize: 13,
    fontWeight: '400',
    paddingVertical: scale(1),
  },
});
