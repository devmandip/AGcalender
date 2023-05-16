import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Header, SubmitBtn, TxtInput} from './addCrop_components';
import {useNavigation} from '@react-navigation/core';
import {scale, theme} from '../../utils';
import {Range_Calender, SelectCropModel} from '../../components';
import {Menu, MenuItem} from 'react-native-material-menu';
import {useDispatch, useSelector} from 'react-redux';
import {getCropData} from '../../redux/Actions/UserActions';
import MapModal from '../../components/appModel/MapModel';
import {useToast} from 'react-native-toast-notifications';
import moment from 'moment';
import {ApiList} from '../../api/ApiList';
import {postServiceCall, putServiceCall} from '../../api/Webservice';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];
const AddCrop = ({route}) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(
    global.editCropData?.cropName ?? null,
  );
  const [isFocus, setIsFocus] = useState(false);
  const hideMenu = (text = '') => {
    setUnits(text);
    setVisible(false);
  };
  const [loader, setLoader] = useState(false);
  const toast = useToast();

  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.UserReducer);
  const [fName, setFName] = useState(userReducer?.userDetails?.username);
  const [mNo, setMNo] = useState(userReducer?.userDetails?.mobileNumber);
  const [submitType, setSubmitType] = useState(
    global.editCropData != null ? global.editCropData?.cropListingId : null,
  );
  const [variety, setVariety] = useState(global.editCropData?.variety ?? '');
  const [Volume, setVolume] = useState(
    global.editCropData?.volume.toString() ?? '',
  );
  const [area, setArea] = useState(global.editCropData?.area ?? '');
  const [showMap, setShowMap] = useState(false);
  const [farmLocation, setFarmLocation] = useState(
    global.editCropData != null
      ? {
          latitude: global.editCropData?.latitude,
          longitude: global.editCropData?.longitude,
        }
      : '',
  );
  const [placeLocation, setPlaceLocation] = useState('');
  const [units, setUnits] = useState(global.editCropData?.unit ?? '');
  const [endDay, setEndDay] = useState(
    global.editCropData?.harvestEndDate ?? '',
  );
  const [startDay, setStartDay] = useState(
    global.editCropData?.harvestStartDate ?? '',
  );
  const currentDate = moment().format('YYYY-MM-DD');
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  useEffect(() => {
    console.log(submitType + ' DATA  ' + JSON.stringify(global.editCropData));
    if (global.editCropData != null) {
      var date = {};
      for (
        const d = moment(global.editCropData?.harvestStartDate);
        d.isSameOrBefore(global.editCropData?.harvestEndDate);
        d.add(1, 'days')
      ) {
        date[d.format('YYYY-MM-DD')] = {
          marked: true,
          color: 'green',
          textColor: 'white',
        };

        if (d.format('YYYY-MM-DD') === global.editCropData?.harvestStartDate)
          date[d.format('YYYY-MM-DD')].startingDay = true;
        if (d.format('YYYY-MM-DD') === global.editCropData?.harvestEndDate)
          date[d.format('YYYY-MM-DD')].endingDay = true;
      }
      setMarkedDates(date);
      fetch(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          global.editCropData?.latitude +
          ',' +
          global.editCropData?.longitude +
          '&key=' +
          'AIzaSyDENJOf97pAC3V97wgCXHxBr8YSLDeijDc',
      )
        .then(response => response.json())
        .then(responseJson => {
          const place = JSON.stringify(
            responseJson?.results[0]?.formatted_address,
          )?.replace(/"/g, '');
          setPlaceLocation(place);
          console.log('name of location ', place);
          global.editCropData = null;
        });
    }
    dispatch(getCropData(userReducer));
  }, []);

  const showMenu = () => setVisible(true);

  const ToastMessage = (message, type) => {
    toast.show(message, {
      type: type === undefined ? 'normal' : type,
      placement: 'bottom',
      duration: 1000,
      animationType: 'zoom-in',
    });
  };

  const checkValidation = async () => {
    if (fName === '') {
      ToastMessage('Farm name is required', 'danger');
    } else if (mNo === '') {
      ToastMessage('Mobile number is required', 'danger');
    } else if (placeLocation === '') {
      ToastMessage('Farm location is required', 'danger');
    } else if (selectedCrop === '') {
      ToastMessage('Crop name is required', 'danger');
    } else if (variety === '') {
      ToastMessage('Variety name is required', 'danger');
    } else if (area === '') {
      ToastMessage('Area name is required', 'danger');
    } else if (startDay == '' || startDay == null) {
      ToastMessage('Harvesting start date is required', 'danger');
    } else if (endDay == '' || endDay == null) {
      ToastMessage('Harvesting end date is required', 'danger');
    } else if (Volume === '') {
      ToastMessage('Yeild Volume is required', 'danger');
    } else if (units === '') {
      ToastMessage('Units is required', 'danger');
    } else {
      setLoader(true);
      try {
        var params = {
          userId: userReducer?.userDetails?.userId,
          cropName: selectedCrop,
          latitude: farmLocation?.latitude,
          longitude: farmLocation?.longitude,
          variety: variety,
          area: area,
          volume: Volume,
          unit: units,
          sowingDate: '',
          harvestStartDate: moment(startDay).format('DD/MM/YYYY') ?? '', //"22/03/2023"
          harvestEndDate: moment(endDay).format('DD/MM/YYYY') ?? '', //"22/03/2023"
          media: '',
        };
        if (submitType != null) {
          putServiceCall(ApiList.ADD_CROP + '/' + submitType, params)
            .then(async responseJson => {
              if (responseJson?.data != '') {
                navigation.navigate('User');
                setLoader(false);
                ToastMessage(responseJson?.data?.message, 'success');
              }
              setLoader(false);
            })
            .catch(error => {
              setLoader(false);
            });
        } else {
          postServiceCall(ApiList.ADD_CROP, params)
            .then(async responseJson => {
              if (responseJson?.data != '') {
                navigation.navigate('Home');
                setLoader(false);
                ToastMessage(responseJson?.data?.message, 'success');
              }
              setLoader(false);
            })
            .catch(error => {
              setLoader(false);
            });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const CalenderViewComponent = useCallback(
    () => (
      <Range_Calender
        markedDates={markedDates}
        endDay={day => {
          setEndDay(day);
        }}
        startDay={day => {
          setStartDay(day);
        }}
      />
    ),
    [markedDates, startDay, endDay],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <MapModal
          close={data => {
            if (data != null) {
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
                    responseJson?.results[0]?.formatted_address,
                  )?.replace(/"/g, '');
                  setFarmLocation(data);
                  setPlaceLocation(place);
                  console.log('name of location ', place);
                });
            }
            setShowMap(false);
          }}
          isVisible={showMap}
        />
        <Header title="Add New Corp" />

        <ScrollView
          nestedScrollEnabled={true}
          style={styles.View1}
          showsVerticalScrollIndicator={false}>
          <View style={styles.input_view}>
            <TxtInput
              value={fName}
              onChangeText={text => setFName(text)}
              width={theme.SCREENWIDTH * 0.43}
              title="Farmer’s Name"
            />
            <TxtInput
              value={mNo}
              keyboardType={'number-pad'}
              onChangeText={text => setMNo(text)}
              width={theme.SCREENWIDTH * 0.43}
              title="Mobile Number"
            />
          </View>

          <View style={styles.input_view}>
            <TxtInput
              style={{fontSize: scale(11)}}
              onTouchStart={() => {
                // if (placeLocation == '') {
                // toast.show(
                //   "Seed once sown can't be uprooted, Location once fixed can't be modified. Please select location of your crop accurately",
                //   {
                //     type: 'success',
                //     placement: 'bottom',
                //     duration: 3000,
                //     animationType: 'zoom-in',
                //   },
                // );
                setShowMap(true);
                // }
              }}
              value={placeLocation}
              width={theme.SCREENWIDTH * 0.43}
              title="Farm Location"
            />
            <TxtInput
              value={selectedCrop}
              onTouchStart={() => {
                setIsFocus(true);
              }}
              width={theme.SCREENWIDTH * 0.43}
              title="Crop Name"
            />

            {/* <Dropdown
              style={[
                styles.dropdown,
                isFocus && {borderColor: theme.colors.primary},
              ]}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
              searchable={true}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              // maxHeight={scale(150)}
              autoScroll={false}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Crop Name' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
              // renderLeftIcon={() => (
              //   <AntDesign
              //     style={styles.icon}
              //     color={isFocus ? 'blue' : 'black'}
              //     name="Safety"
              //     size={20}
              //   />
              // )}
            /> */}
          </View>

          <View style={styles.input_view}>
            <TxtInput
              value={variety}
              onChangeText={text => setVariety(text)}
              width={theme.SCREENWIDTH * 0.42}
              title="Variety"
            />
            <TxtInput
              keyboardType={'numeric'}
              value={area}
              onChangeText={text => setArea(text)}
              width={theme.SCREENWIDTH * 0.32}
              title="Area"
            />
            <Text style={styles.secondary_txt}>Ac.</Text>
          </View>

          <Text style={styles.calender_title}>
            Select Harvesting Start and End Dates
          </Text>
          {/* <CalenderView showheader={false} /> */}
          {CalenderViewComponent()}

          <View style={[styles.input_view, {marginTop: scale(10)}]}>
            <TxtInput
              value={Volume}
              keyboardType={'number-pad'}
              onChangeText={text => setVolume(text)}
              width={theme.SCREENWIDTH * 0.3}
              title="Expected Yield"
            />
            <View
              style={[
                styles.input_view,
                {marginHorizontal: scale(1), alignItems: 'center'},
              ]}>
              <TxtInput
                editable={false}
                value={units}
                onChangeText={text => setUnits(text)}
                width={theme.SCREENWIDTH * 0.3}
                title="Units"
              />
              <Menu
                visible={visible}
                anchor={
                  <Text
                    style={{
                      marginHorizontal: scale(5),
                      paddingVertical: scale(5),
                    }}
                    onPress={showMenu}>
                    Select
                  </Text>
                }
                onRequestClose={hideMenu}>
                <MenuItem onPress={() => hideMenu('Tons')}>Tons</MenuItem>
                <MenuItem onPress={() => hideMenu('Quintals')}>
                  Quintals
                </MenuItem>
              </Menu>
            </View>
          </View>

          {loader ? (
            <View
              style={[
                {
                  height: 50,
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#56AB2F',
                },
                styles.btnStyle,
              ]}>
              <ActivityIndicator size="large" color={theme.colors.white} />
            </View>
          ) : (
            <SubmitBtn
              onPress={() => checkValidation()}
              style={styles.btnStyle}
            />
          )}
        </ScrollView>
      </View>
      <SelectCropModel
        selectedItem={item => {
          setSelectedCrop(item?.name);
        }}
        listData={userReducer?.cropsList}
        isVisible={isFocus}
        close={() => setIsFocus(false)}
      />
    </SafeAreaView>
  );
};

export default AddCrop;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  View1: {
    marginHorizontal: 15,
    marginBottom: 60,
  },
  input_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    alignItems: 'center',
  },
  secondary_txt: {
    alignSelf: 'flex-end',
    color: 'black',
    right: 5,
    fontSize: 16,
  },
  calender_title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 30,
  },
  btnStyle: {
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: theme.colors.primary,
  },
  dcontainer: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: scale(45),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: theme.SCREENWIDTH * 0.3,
    marginTop: scale(20),
    marginHorizontal: scale(8),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
