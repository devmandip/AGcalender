import {SafeAreaView, Share, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Header} from './home/components';
import {Label, Title} from '../components';
import {scale} from '../utils';
import {temars1, temars2} from '../utils/MockData';

const TermsAndConditions = ({navigation}) => {
  const onSharePress = async () => {
    try {
      const result = await Share.share({
        title: 'Ag Calendar',
        message: `Amrit kaal me kisan rahe,Samay se aage -Ag Calendar Download the app now...
                  https://drive.google.com/file/d/1x-dfHM8r7h2CvE6Bwfr14iTfxkM0hm7w/view?usp=drivesdk`,
        url: 'https://play.google.com/store/apps/details?id=com.agcalender',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPressMenu={() => {
          navigation.goBack();
        }}
      />
      <View style={{flex: 0.8}}>
        <Title title="Terms And Conditions" />
        <Label title="Welcome to AgMart" style={styles.subTitle} />
        <Label title={temars1} style={styles.bodytxt} />
        <Label title={temars2} style={styles.bodytxt} />
      </View>
      <Icon
        name="share-2"
        size={scale(30)}
        style={{alignSelf: 'center'}}
        onPress={() => {
          onSharePress();
        }}
      />
    </SafeAreaView>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(10),
  },
  subTitle: {
    marginTop: scale(10),
    marginLeft: scale(20),
  },
  bodytxt: {
    marginVertical: scale(10),
  },
});
