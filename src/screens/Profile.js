import {
  Alert,
  FlatList,
  Image,
  PermissionsAndroid,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {images, moderatedScale, scale, theme} from '../utils';
import {Label, Title} from '../components';
import {chatData, cropData, optionsData} from '../utils/MockData';
import {useIsFocused, useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {isLogin, userData, userWiseDetails} from '../redux/Actions/UserActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ApiList} from '../api/ApiList';
import {
  deleteServiceCall,
  postServiceCall,
  putServiceCall,
} from '../api/Webservice';
import {useToast} from 'react-native-toast-notifications';
import {launchCamera} from 'react-native-image-picker';
import {RNS3} from 'react-native-aws3';
import moment from 'moment';

const Profile = () => {
  const [selTab, setTab] = useState(0);
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();
  const loginUserData = useSelector(state => state.UserReducer);
  const isDocus = useIsFocused();
  const toast = useToast();
  const [userLocation, setUserLocation] = useState('');

  useEffect(() => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        loginUserData?.userWiseDetails.latitude +
        ',' +
        loginUserData?.userWiseDetails.longitude +
        '&key=' +
        'AIzaSyDENJOf97pAC3V97wgCXHxBr8YSLDeijDc',
    )
      .then(response => response.json())
      .then(responseJson => {
        const place = JSON.stringify(
          responseJson?.results[0]?.address_components[4]?.long_name,
        )?.replace(/"/g, '');
        setUserLocation(place);
        console.log(
          'name of location ',
          responseJson?.results[0]?.address_components[4]?.long_name,
        );
      });
    dispatch(userWiseDetails(loginUserData));
  }, [isDocus]);

  const deleteCropApiCall = id => {
    deleteServiceCall(ApiList.ADD_CROP + '/' + id, '')
      .then(async responseJson => {
        if (responseJson?.data != '') {
          toast.show(responseJson?.data?.message, {
            type: 'success',
            placement: 'bottom',
            duration: 1000,
            animationType: 'zoom-in',
          });
          dispatch(userWiseDetails(loginUserData));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const uploadImgApicall = (item, file) => {
    try {
      // var params = {
      //   title: item.cropName,
      //   description: item?.description,
      //   file: file,
      // };
      var data = new FormData();
      data.append(
        'title',
        'cl_' + item?.cropName + '_' + moment().format('MM-DD-YYYYHH:mm'),
      );
      data.append('description', item?.description);
      data.append('file', file);

      postServiceCall(
        ApiList.ADD_CROP + '/' + item.cropListingId + '/image',
        data,
        false,
        true,
      )
        .then(async responseJson => {
          ToastMessage('Image upload successfully.', 'success');
          dispatch(userWiseDetails(loginUserData));
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const ToastMessage = (message, type) => {
    toast.show(message, {
      type: type === undefined ? 'normal' : type,
      placement: 'bottom',
      duration: 1000,
      animationType: 'zoom-in',
    });
  };

  const cameraHandler = async item => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const option = {
          includeBase64: false,
          mediaType: 'photo',
          quality: 0.5,
        };
        launchCamera(option, async response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            console.log(response);
            let ext = getExtention(response.assets[0].uri);

            const file = {
              uri: response.assets[0].uri,
              name:
                'cl_' +
                item?.cropName +
                '_' +
                moment().format('MM-DD-YYYYHH:mm') +
                '.' +
                ext,
              type: response.assets[0].type,
            };
            uploadImgApicall(item, file);
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader} />

      <View style={styles.imageContainer}>
        <Image
          style={styles.userImage}
          source={{
            uri:
              loginUserData?.userWiseDetails?.imageURI ??
              'https://media.istockphoto.com/id/1319254635/photo/latin-american-farmer-working-in-agriculture-at-a-farm.jpg?s=612x612&w=0&k=20&c=uSUaq4iNJB1TYt4RCCtf9sp6FdPyJyHbXqmKa9AqFHY=',
          }}
        />
      </View>

      <Icon
        name="more-vertical"
        color={theme.colors.black}
        size={scale(20)}
        style={styles.menu}
        onPress={async () => {
          navigation.replace('authStack');
          await AsyncStorage.removeItem('token');
          dispatch(isLogin(false));
          dispatch(userData(null));
        }}
      />

      <View style={styles.bodyContainer}>
        <View style={styles.nameContainer}>
          <View style={styles.row}>
            <Title
              title={`${loginUserData?.userWiseDetails?.username}, `}
              style={styles.title}
            />
            <Label
              title={loginUserData?.userWiseDetails?.profession}
              style={styles.profession}
            />
          </View>

          <View style={styles.row}>
            <Title title={userLocation} style={styles.title} />
            <Image source={images.pin} style={styles.pin} />
          </View>
        </View>

        <View style={styles.divider} />

        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.tabContainer}>
            {optionsData?.map((item, idx) => {
              return (
                <TouchableOpacity
                  key={idx.toString()}
                  style={[
                    styles.tabBar,
                    {
                      borderBottomWidth: idx === selTab ? 2 : 0,
                      borderColor:
                        idx === selTab ? theme.colors.primary : 'transparent',
                      height: scale(30),
                    },
                  ]}
                  onPress={() => {
                    setTab(idx);
                  }}>
                  <Label
                    title={item.title}
                    style={[
                      styles.tabTxt,
                      {fontWeight: idx === selTab ? '600' : '400'},
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* farmer crops */}

        {selTab === 0 && (
          <FlatList
            ItemSeparatorComponent={<View style={{marginVertical: scale(5)}} />}
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
            data={loginUserData?.userWiseDetails?.cropListingResponses}
            renderItem={({item, index}) => {
              return (
                <View style={styles.cropCard} key={index.toString()}>
                  <View style={[styles.row, {justifyContent: 'space-between'}]}>
                    <Label
                      title={'Listing ID : ' + item?.cropListingId}
                      style={styles.startDate}
                    />
                    <Label title={item?.cropName} style={styles.startDate} />
                  </View>
                  <View
                    style={[
                      styles.row,
                      {
                        justifyContent: 'space-between',
                        marginVertical: scale(8),
                      },
                    ]}>
                    <Text style={styles.name}>
                      Corp Name
                      <Text style={styles.cName}>{` ${item?.cropName}`}</Text>
                    </Text>
                    <Label title={'Area : ' + item?.area} />
                  </View>
                  <Label
                    title={'Harvesting Start From : ' + item?.harvestStartDate}
                    style={styles.date}
                  />
                  <View style={styles.row}>
                    <ScrollView
                      style={[styles.imgContainer]}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      nestedScrollEnabled>
                      {item?.images && item?.images?.length === 0 ? (
                        <View
                          style={{
                            alignItems: 'center',
                            width: theme.SCREENWIDTH * 0.75,
                          }}>
                          <Label title="No crop image found" />
                        </View>
                      ) : (
                        item?.images?.map((img, i) => {
                          return (
                            <Image
                              source={{
                                uri: img?.imagePathOrig,
                              }}
                              style={styles.cropImg}
                            />
                          );
                        })
                      )}
                    </ScrollView>
                    <TouchableOpacity
                      onPress={() => {
                        cameraHandler(item);
                      }}
                      style={styles.addIcon}>
                      <Icon1
                        name="add-circle-outline"
                        size={scale(25)}
                        color={theme.colors.add}
                      />
                      <Label title="Add" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={[
                      styles.row,
                      {
                        justifyContent: 'space-between',
                        paddingTop: scale(10),
                      },
                    ]}>
                    <View style={styles.view}>
                      <Icon2
                        size={scale(20)}
                        color={theme.colors.gray2}
                        name="stopwatch"
                      />
                      <Label title="10/01/2023" style={styles.lbl} />
                    </View>
                    <View style={styles.view}>
                      <Icon
                        size={scale(20)}
                        color={theme.colors.gray2}
                        name="eye"
                      />
                      <Label title="10/01/2023" style={styles.lbl} />
                    </View>
                    <View style={styles.view}>
                      <Icon
                        size={scale(20)}
                        color={theme.colors.gray2}
                        name="heart"
                      />
                      <Label title="500" style={styles.lbl} />
                    </View>
                    <View style={styles.view}>
                      <Icon
                        size={scale(20)}
                        color={theme.colors.gray2}
                        name="message-square"
                      />
                      <Label title="Comments" style={styles.lbl} />
                    </View>
                    <Pressable
                      onPress={() => {
                        global.editCropData = item;
                        navigation.navigate('Add');
                      }}
                      style={styles.view}>
                      <Icon3
                        size={scale(20)}
                        color={theme.colors.gray2}
                        name="circle-edit-outline"
                      />
                      <Label title="Edit" style={styles.lbl} />
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        Alert.alert('', 'Are you sure you want to delete?', [
                          {
                            text: 'No',
                          },
                          {
                            text: 'Yes',
                            onPress: () => {
                              deleteCropApiCall(item?.cropListingId);
                            },
                          },
                        ]);
                      }}
                      style={styles.view}>
                      <Icon3
                        size={scale(20)}
                        color={theme.colors.gray2}
                        name="delete-circle-outline"
                      />
                      <Label title="Delete" style={styles.lbl} />
                    </Pressable>
                  </View>
                </View>
              );
            }}
          />
        )}

        {/* Chat tabBar */}

        {selTab === 1 && (
          <FlatList
            data={chatData}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity style={styles.chatCard}>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
                    }}
                    style={styles.userChatImg}
                  />
                  <View>
                    <Title title={item?.name} />
                    <Label title={item?.time} style={styles.time} />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}

        {/* Your Activity  */}

        {selTab === 2 && (
          <FlatList
            data={chatData}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity style={styles.chatCard}>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
                    }}
                    style={styles.userChatImg}
                  />
                  <View>
                    <Title title={'Vikas Shah and others like your post.'} />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: theme.colors.gray,
    height: '15%',
  },
  imageContainer: {
    borderWidth: scale(1),
    width: scale(100),
    borderRadius: scale(50),
    overflow: 'hidden',
    position: 'absolute',
    top: '9%',
    marginLeft: moderatedScale(14),
  },
  userImage: {
    height: scale(100),
    width: scale(100),
    resizeMode: 'cover',
    backgroundColor: theme.colors.gray,
  },
  bodyContainer: {
    padding: moderatedScale(12),
    height: '75%',
  },
  menu: {
    alignSelf: 'flex-end',
    paddingTop: scale(5),
  },
  nameContainer: {
    flexDirection: 'row',
    marginTop: scale(30),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pin: {
    height: scale(20),
    resizeMode: 'contain',
    width: scale(20),
    marginRight: scale(-8),
  },
  tabBar: {
    marginHorizontal: scale(15),
    borderRadius: scale(4),
  },
  tabTxt: {
    fontSize: scale(15),
    marginBottom: scale(5),
    height: scale(20),
  },
  tabContainer: {
    marginVertical: scale(10),
  },
  chatCard: {
    flexDirection: 'row',
    padding: scale(5),
    // marginVertical: scale(5),
    alignItems: 'center',
    borderColor: theme.colors.gray,
    borderTopWidth: scale(1),
    borderBottomWidth: scale(1),
  },
  userChatImg: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(25),
    marginHorizontal: scale(8),
  },
  cropImg: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(7),
    marginHorizontal: scale(4),
    resizeMode: 'cover',
  },
  time: {
    fontSize: scale(11),
  },
  cropCard: {
    borderColor: theme.colors.primary,
    borderWidth: scale(2),
    padding: scale(5),
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
  },
  startDate: {
    fontSize: scale(11),
  },
  name: {
    fontWeight: '600',
    fontSize: scale(14),
    color: theme.colors.black,
  },
  cName: {
    fontWeight: '300',
    fontSize: scale(12),
  },
  date: {
    marginBottom: scale(7),
    fontWeight: '500',
  },
  addIcon: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(8),
    backgroundColor: theme.colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(-5),
    marginLeft: scale(4),
  },
  imgContainer: {
    paddingVertical: scale(5),
    paddingEnd: scale(10),
  },
  divider: {
    marginVertical: scale(10),
    height: scale(0.7),
    width: '109%',
    backgroundColor: theme.colors.black,
    alignSelf: 'center',
  },
  lbl: {
    fontSize: scale(10),
    marginTop: scale(3),
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profession: {
    width: '60%',
    margin: 0,
    fontSize: scale(10),
    left: scale(5),
  },
});
