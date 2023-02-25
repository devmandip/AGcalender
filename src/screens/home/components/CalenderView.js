import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

const CalenderHeader = () => {
  return (
    <View style={styles.header_container}>
      <Image
        source={require('../../../assets/Images/calenderImages/map.png')}
        style={styles.header_img}
      />
      <View style={styles.header_txtView}>
        <Text style={styles.title1}>Harvesting calendar</Text>
        <Text style={styles.title2}>
          Samay ki pallaki - buvaee se bikri Tak...
        </Text>
      </View>
      <Image
        source={require('../../../assets/Images/calenderImages/calender.png')}
        style={styles.header_img}
      />
    </View>
  );
};

const CalenderView = prpos => {
  const today = moment().format('YYYY-MM-DD');

  const {showheader} = prpos;

  return (
    <View style={styles.container}>
      {showheader === false ? null : <CalenderHeader />}

      <Calendar
        hideArrows={true}
        markedDates={{
          [today]: {selected: true, selectedColor: '#56AB2F'},
        }}
        renderHeader={date => {}}
        onDayPress={day => {
          console.log('selected day', day);
        }}
        theme={{
          selectedDayBackgroundColor: '#56AB2F',
          selectedDayTextColor: 'white',
        }}
      />
    </View>
  );
};

export default CalenderView;

const styles = StyleSheet.create({
  container: {},

  // calender header style
  header_container: {
    marginTop: 15,
    backgroundColor: '#56AB2F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  header_img: {
    height: 40,
    width: 40,
  },
  header_txtView: {
    alignItems: 'center',
  },
  title1: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  title2: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
  },
});
