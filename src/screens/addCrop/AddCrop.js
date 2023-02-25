import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {Header, SubmitBtn, TxtInput} from './addCrop_components';
import {CalenderView} from '../home/components';
import {useNavigation} from '@react-navigation/core';

const AddCrop = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="Add Corp" />

      <ScrollView style={styles.View1} showsVerticalScrollIndicator={false}>
        <View style={styles.input_view}>
          <TxtInput width={170} title="Farmer’s Name" />
          <TxtInput width={170} title="Mobile Number" />
        </View>

        <View style={styles.input_view}>
          <TxtInput width={170} title="Farm Location" />
          <TxtInput width={170} title="Crop Name" />
        </View>

        <View style={styles.input_view}>
          <TxtInput width={190} title="Variety" />
          <TxtInput width={120} title="Area" />
          <Text style={styles.secondary_txt}>Ac.</Text>
        </View>

        <Text style={styles.calender_title}>Harvesting Date</Text>
        <CalenderView showheader={false} />

        <View style={[styles.input_view, {marginTop: 20}]}>
          <TxtInput width={210} title="Approximate Volume" />
          <TxtInput width={130} title="Units" />
        </View>

        <SubmitBtn
          onPress={() => navigation.navigate('Camera')}
          style={styles.btnStyle}
        />
      </ScrollView>
    </View>
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
  },
});
