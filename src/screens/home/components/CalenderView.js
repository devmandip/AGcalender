import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import {scale, theme} from '../../../utils';
import {Label} from '../../../components';
import ProgressCircle from 'react-native-progress-circle';
import Toast from '../../../components/Toast';

const CalenderHeader = props => {
  const {scrollPosition} = props;
  const [dateViewShow, setDateViewShow] = useState(false);

  const today = moment().format('YYYY-MM-DD');

  const date = new Date(today);
  const options = {day: 'numeric', month: 'long', year: 'numeric'};
  const formattedDate = date.toLocaleDateString('en-US', options);

  useEffect(() => {
    if (scrollPosition > 80) {
      setDateViewShow(false);
    }
  }, [scrollPosition]);

  const dayComponent = ({date}) => {
    const [showPopup, setShowPopup] = useState(false);

    const handlePress = () => {
      setShowPopup(!showPopup);
    };

    return (
      <>
        <TouchableOpacity onPress={handlePress}>
          <ProgressCircle
            percent={10}
            radius={20}
            borderWidth={2}
            color="#FFD580"
            shadowColor="#f2f2f2"
            bgColor="white">
            <Text style={{fontSize: 18, textAlign: 'center'}}>{date.day}</Text>
          </ProgressCircle>
        </TouchableOpacity>
        {showPopup && <Toast />}
      </>
    );
  };

  return (
    <View style={styles.header_container}>
      <View style={styles.headerView}>
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
        {/* <Image
          source={require('../../../assets/Images/calenderImages/calender.png')}
          style={styles.header_img}
        /> */}
        <View style={styles.calCon}>
          <View style={styles.monthcon}>
            <Label title={'March'} style={styles.month} />
          </View>

          <Label title="11" style={styles.date} />
          <Label title="Saturday" style={styles.daytxt} />
        </View>
      </View>
      <View style={styles.dateView}>
        <Label title={formattedDate} style={styles.dateTxt} />
        <TouchableOpacity
          onPress={() => {
            setDateViewShow(!dateViewShow);
          }}>
          <Icon
            name={dateViewShow ? 'chevron-up' : 'chevron-down'}
            color={theme.colors.black}
            size={scale(22)}
          />
        </TouchableOpacity>
      </View>

      {dateViewShow && (
        <Calendar
          hideArrows={false}
          enableSwipeMonths={true}
          markedDates={{
            [today]: {selected: true, selectedColor: theme.colors.primary},
          }}
          hideExtraDays={true}
          renderHeader={date => {}}
          theme={{
            selectedDayBackgroundColor: theme.colors.primary,
            selectedDayTextColor: 'white',
          }}
          dayComponent={dayComponent}
        />
      )}
    </View>
  );
};

const CalenderView = prpos => {
  const today = moment().format('YYYY-MM-DD');

  const {showheader, hideCal, scrollPosition} = prpos;

  return (
    <View style={styles.container}>
      {showheader === false ? null : (
        <CalenderHeader scrollPosition={scrollPosition} />
      )}

      {hideCal ? null : (
        <Calendar
          // hideArrows={false}
          // enableSwipeMonths={true}
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
          headerStyle={{color: theme.colors.black}}
        />
      )}
    </View>
  );
};

export default CalenderView;

const styles = StyleSheet.create({
  container: {},
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(5),
    paddingHorizontal: scale(5),
  },
  // calender header style
  header_container: {
    marginTop: theme.SCREENHEIGHT * 0.03,
    backgroundColor: theme.colors.primary,
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    marginHorizontal: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    borderRadius: scale(10),
    overflow: 'hidden',
    marginBottom: scale(5),
  },
  header_img: {
    height: 40,
    width: 40,
  },
  dateView: {
    width: '100%',
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
  },
  header_txtView: {
    alignItems: 'center',
  },
  title1: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: theme.fonts.InterBold,
  },
  title2: {
    color: 'white',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: theme.fonts.InterMedium,
  },
  dateTxt: {
    color: theme.colors.primary,
    fontSize: scale(16),


  popup_style: {
    position: 'absolute',
    width: scale(80),
    height: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10),
    backgroundColor: theme.colors.gray1,
  },
  calCon: {
    backgroundColor: theme.colors.white,
    borderRadius: scale(4),
    width: scale(50),
    margin: scale(5),
    overflow: 'hidden',
  },
  monthcon: {backgroundColor: theme.colors.yellow, paddingVertical: 1},
  month: {fontSize: scale(10), textAlign: 'center', color: theme.colors.white},
  date: {
    fontSize: scale(11),
    textAlign: 'center',
    fontWeight: '700',
  },
  daytxt: {fontSize: scale(10), textAlign: 'center'},
});
