import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {Label, Title} from '../components';
import {scale} from '../utils';
import {whyhc} from '../utils/MockData';
import {useRoute} from '@react-navigation/core';

const StaticPage = () => {
  const route = useRoute();
  const {data} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Title title={data?.title} />

      <ScrollView>
        {data?.desc.map((item, index) => {
          return <Label title={item} style={styles.bodytxt} />;
        })}
      </ScrollView>

      <Label title={whyhc[3]} style={styles.bodytxt} />
    </SafeAreaView>
  );
};

export default StaticPage;

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
