import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header} from './home/components';
import {Label, Title} from '../components';
import {scale} from '../utils';
import {temars1, temars2} from '../utils/MockData';

const TermsAndConditions = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Title title="Terms And Conditions" />
      <Label title="Welcome to AgMart" style={styles.subTitle} />
      <Label title={temars1} style={styles.bodytxt} />
      <Label title={temars2} style={styles.bodytxt} />
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
