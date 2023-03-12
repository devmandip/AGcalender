import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Header} from './home/components';
import {Label, Title} from '../components';
import {scale} from '../utils';
import {whyhc} from '../utils/MockData';
import {useNavigation, useRoute} from '@react-navigation/core';

const StaticPage = () => {
  const route = useRoute();
  const {data} = route.params;
  console.log('route >>> ', data);
  const navigation = useNavigation();
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: () => <Label title={data?.title} />,
  //     headerShadowVisible: false,
  //   });
  // }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      {/* <Header /> */}
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
