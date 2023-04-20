import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Platform,
} from 'react-native';
import React,{useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {YardData} from '../../../utils/MockData';
import {scale, theme} from '../../../utils';
import Header from './Header';
import Story from './Story';
import {useDispatch, useSelector} from 'react-redux';
import ApiService, { API } from '../../../utils/ApiService';

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
        style={[styles.headerView, , {borderLeftWidth: 1, borderTopWidth: 1}]}>
        <Text style={styles.header_txt}>APMC Yard</Text>
      </View>
      <View
        style={[styles.headerView, , {borderLeftWidth: 1, borderTopWidth: 1}]}>
        <Text style={styles.header_txt}> Arrival Quantity </Text>
      </View>
      <View
        style={[
          styles.headerView,
          ,
          {borderLeftWidth: 1, borderTopWidth: 1, borderRightWidth: 1},
        ]}>
        <Text style={styles.header_txt}>Modal Price</Text>
        <Text style={[styles.header_txt, {fontSize: scale(11)}]}>
          (Min/max)
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
        <Text style={styles.yard_txt}>{date}</Text>
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
          {/* <AntDesign
            name="arrowdown"
            size={scale(15)}
            style={{right: scale(3)}}
            color="red"
          /> */}
          <Text style={styles.yard_txt}>
            {down} - {up}
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
        date={item.date}
        landMark={item.location.landMark}
        km={item.location.km}
        state={item.location.product}
        product={item.product}
        weight={item.weight}
        Rs={item.price.RS}
        up={item.price.up}
        down={item.price.Down}
      />
    </View>
  );
};

const YardVew = () => {
const [yardData, setYardData] = useState([])

  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.UserReducer);

   const getYardDetailsByID =async id => {
      try {
        const response = await ApiService.get(`${API.mRates}cropId=${id}&latitude=${"17.3850"}&longitude=${"78.4867"}&radius=${"1000000"}`);
        if (response) {
          setYardData(response)
        } else {
          console.log('response > ', response);
        }
      } catch (error) {
        console.log('error in USERDETAILS', error);
      }
    };
console.log(yardData)

  return (
    <SafeAreaView>
      <Header />
      <Story
        selectPress={item => {
          getYardDetailsByID(item?.id)
        }}
        listData={userReducer?.categoryList}
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
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: scale(10)}}
            data={YardData}
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
