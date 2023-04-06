import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Header} from './home/components';
import {Label, Title} from '../components';
import {scale} from '../utils';
import {whyhc} from '../utils/MockData';
import {useNavigation} from '@react-navigation/core';

const HowItWork = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Label title="Why Harvesting Calendar" />,
      headerShadowVisible: false,
    });
  }, [navigation]);
  
  return (
    <SafeAreaView style={styles.container}>
      {/* <Header /> */}

      <Label title={whyhc[0]} style={styles.bodytxt} />
      <Label title={whyhc[1]} style={styles.bodytxt} />
      <Label title={whyhc[2]} style={styles.bodytxt} />
      <Label title={whyhc[3]} style={styles.bodytxt} />
    </SafeAreaView>
  );
};

export default HowItWork;

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
