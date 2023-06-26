import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Label, Title} from '../components';
import {scale} from '../utils';
import {whyhc} from '../utils/MockData';
import {useNavigation, useRoute} from '@react-navigation/core';

const StaticPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {data} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="left" size={scale(22)} color={'#000'} />
        </TouchableOpacity>
      </View>
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
  headerView: {
    height: scale(55),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  subTitle: {
    marginTop: scale(10),
    marginLeft: scale(20),
  },
  bodytxt: {
    marginVertical: scale(10),
  },
});
