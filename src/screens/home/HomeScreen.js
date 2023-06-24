import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  SafeAreaView,
  PermissionsAndroid,
  TouchableOpacity,
  Pressable,
  Linking,
} from 'react-native';
import React, {useEffect, useCallback, useState} from 'react';
import {CalenderView, Header, PostSection, Story} from './components';
import {DrawerModal, Loader, SelectCropModel} from '../../components';
import {theme} from '../../utils';
import Toast from '../../components/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {getCategoriesData, getCropData} from '../../redux/Actions/UserActions';
import {useFocusEffect, useIsFocused} from '@react-navigation/core';
import Geolocation from '@react-native-community/geolocation';
import {getServiceCall} from '../../api/Webservice';
import {ApiList} from '../../api/ApiList';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [drawerModal, setDrawerModel] = useState(false);

  const [listData, setListData] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedCate, setSelectedCate] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.UserReducer);
  const [tempCropList, setTempCropList] = useState(userReducer?.cropsList);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      (async () => {
        dispatch(getCropData(selectedCate?.id));
        dispatch(getCategoriesData());
        setTimeout(() => {
          setLoading(
            () => false,
            callListApi(global.currentLocation, moment().format('DD/MM/YYYY')),
          );
        }, 1000);
      })();
    }, []),
  );

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

  const initiateWhatsApp = mobileNumber => {
    // Check for perfect 10 digit length
    if (mobileNumber.length != 10) {
      alert('Please insert correct WhatsApp number');
      return;
    }
    // Using 91 for India
    // You can change 91 with your country code
    let url = 'whatsapp://send?text=' + 'Hello ' + '&phone=91' + mobileNumber;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened');
      })
      .catch(() => {
        alert('Make sure Whatsapp installed on your device');
      });
  };

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('ImageView', {item});
        }}>
        <PostSection
          postImages={item?.images}
          proicePic={require('../../assets/Images/postImages/profileImage.png')}
          name={item.username}
          description={
            'Srinivas rao from Manvi cultivating Supreme varietyChilli in 4 ac. Expected to harvest 20 Quintalson/after 29-01-23'
          }
          view_count={'221'}
          like_count={'167'}
          oncommentPress={() => initiateWhatsApp(item.mobileNumber)}
          onMessagePress={() => {
            Linking.openURL(`tel:${item.mobileNumber}`);
          }}
        />
      </Pressable>
    );
  };

  const callListApi = async (farmLocation, date) => {
    try {
      const lat = farmLocation?.latitude;
      const long = farmLocation?.longitude;
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
            setLoading(false);
            setListData(responseJson?.data?.data);
          }
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
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
        // onScroll={event => handleScroll(event)}
      >
        <View style={styles.container}>
          <Header
            value={search}
            onChangeText={text => {
              setSearch(text);
            }}
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
            listData={tempCropList}
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

      <Loader loading={loading} />
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
