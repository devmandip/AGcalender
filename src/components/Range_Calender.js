import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';

const Range_Calender = props => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startDay, setStartDay] = useState('');
  const [endDay, setEndDay] = useState('');

  const currentDate = moment().format('YYYY-MM-DD');

  console.log(startDay, endDay);

  return (
    <Calendar
      onDayPress={day => {
        if (startDay && !endDay) {
          const date = {};
          for (
            const d = moment(startDay);
            d.isSameOrBefore(day.dateString);
            d.add(1, 'days')
          ) {
            date[d.format('YYYY-MM-DD')] = {
              marked: true,
              color: 'green',
              textColor: 'white',
            };

            if (d.format('YYYY-MM-DD') === startDay)
              date[d.format('YYYY-MM-DD')].startingDay = true;
            if (d.format('YYYY-MM-DD') === day.dateString)
              date[d.format('YYYY-MM-DD')].endingDay = true;
          }

          setSelectedDate(date);
          setEndDay(day.dateString);
          props.endDay(day.dateString);
        } else {
          setStartDay(day.dateString);
          props.startDay(day.dateString);
          setEndDay(null);
          setSelectedDate({
            [day.dateString]: {
              marked: true,
              color: 'green',
              textColor: 'white',
              startingDay: true,
              endingDay: true,
            },
          });
        }
      }}
      monthFormat={'yyyy MMM'}
      hideDayNames={false}
      markingType={'period'}
      markedDates={{
        ...selectedDate,
        [currentDate]: {
          marked: true,
        },
      }}
      theme={{
        dotColor: 'green',
        arrowColor: 'black',
      }}
    />
  );
};

export default Range_Calender;

const styles = StyleSheet.create({});
