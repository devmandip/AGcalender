import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {images, moderatedScale, scale, theme} from '../utils';
import {Label, Title} from '../components';
import {chatData, cropData, optionsData} from '../utils/MockData';

const Profile = () => {
  const [selTab, setTab] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader} />

      <View style={styles.imageContainer}>
        <Image
          style={styles.userImage}
          source={{
            uri: 'https://media.istockphoto.com/id/1319254635/photo/latin-american-farmer-working-in-agriculture-at-a-farm.jpg?s=612x612&w=0&k=20&c=uSUaq4iNJB1TYt4RCCtf9sp6FdPyJyHbXqmKa9AqFHY=',
          }}
        />
      </View>

      <Icon
        name="more-vertical"
        color={theme.colors.black}
        size={scale(20)}
        style={styles.menu}
        onPress={() => {
          alert('call');
        }}
      />

      <View style={styles.bodyContainer}>
        <View style={styles.nameContainer}>
          <View style={styles.row}>
            <Title title="Lokesh Kakarla, " style={styles.title} />
            <Label title="Farmer" />
          </View>

          <View style={styles.row}>
            <Title title="Kanpur" style={styles.title} />
            <Image source={images.pin} style={styles.pin} />
          </View>
        </View>

        <View style={styles.divider} />

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

        {/* farmer crops */}

        {selTab === 0 && (
          <FlatList
            data={cropData}
            renderItem={({item, index}) => {
              return (
                <View style={styles.cropCard} key={index.toString()}>
                  <View style={[styles.row, {justifyContent: 'space-between'}]}>
                    <Label
                      title={'Listing ID : ' + item?.lid}
                      style={styles.startDate}
                    />
                    <Label title={item?.date} style={styles.startDate} />
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
                    title="Harvesting Start From : 10/12/2022"
                    style={styles.date}
                  />
                  <View style={styles.row}>
                    <ScrollView
                      style={styles.imgContainer}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      nestedScrollEnabled>
                      {item?.images?.map((img, i) => {
                        return (
                          <Image
                            source={{
                              uri: img,
                            }}
                            style={styles.cropImg}
                          />
                        );
                      })}
                    </ScrollView>
                    <TouchableOpacity style={styles.addIcon}>
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
                      {justifyContent: 'space-between', paddingTop: scale(10)},
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
                    <View style={styles.view}>
                      <Icon3
                        size={scale(20)}
                        color={theme.colors.gray2}
                        name="message-processing-outline"
                      />
                      <Label title="Chat" style={styles.lbl} />
                    </View>
                    <View style={styles.view}>
                      <Icon3
                        size={scale(20)}
                        color={theme.colors.gray2}
                        name="dots-vertical-circle-outline"
                      />
                      <Label title="More" style={styles.lbl} />
                    </View>
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
    marginBottom: scale(2),
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
});
