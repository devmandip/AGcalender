import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {Header, SubmitBtn, TxtInput} from './addCrop_components';
import {CalenderView} from '../home/components';
import {useNavigation} from '@react-navigation/core';
import {scale, theme} from '../../utils';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Range_Calender, SelectCropModel} from '../../components';

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];
const AddCrop = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header title="Add New Corp" />

        <ScrollView
          nestedScrollEnabled={true}
          style={styles.View1}
          showsVerticalScrollIndicator={false}>
          <View style={styles.input_view}>
            <TxtInput width={theme.SCREENWIDTH * 0.43} title="Farmer’s Name" />
            <TxtInput width={theme.SCREENWIDTH * 0.43} title="Mobile Number" />
          </View>

          <View style={styles.input_view}>
            <TxtInput width={theme.SCREENWIDTH * 0.43} title="Farm Location" />
            <TxtInput
              onTouchStart={() => {
                setIsFocus(true);
              }}
              width={theme.SCREENWIDTH * 0.43}
              title="Crop Name"
            />

            {/* <Dropdown
              style={[
                styles.dropdown,
                isFocus && {borderColor: theme.colors.primary},
              ]}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
              searchable={true}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              // maxHeight={scale(150)}
              autoScroll={false}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? 'Crop Name' : '...'}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
              // renderLeftIcon={() => (
              //   <AntDesign
              //     style={styles.icon}
              //     color={isFocus ? 'blue' : 'black'}
              //     name="Safety"
              //     size={20}
              //   />
              // )}
            /> */}
          </View>

          <View style={styles.input_view}>
            <TxtInput width={theme.SCREENWIDTH * 0.42} title="Variety" />
            <TxtInput width={theme.SCREENWIDTH * 0.32} title="Area" />
            <Text style={styles.secondary_txt}>Ac.</Text>
          </View>

          <Text style={styles.calender_title}>Harvesting Date</Text>
          {/* <CalenderView showheader={false} /> */}

          <Range_Calender />

          <View style={[styles.input_view, {marginTop: scale(10)}]}>
            <TxtInput
              width={theme.SCREENWIDTH * 0.43}
              title="Approximate Volume"
            />
            <TxtInput width={theme.SCREENWIDTH * 0.43} title="Units" />
          </View>

          <SubmitBtn
            onPress={() => navigation.navigate('Camera')}
            style={styles.btnStyle}
          />
        </ScrollView>
      </View>
      <SelectCropModel isVisible={isFocus} close={() => setIsFocus(false)} />
    </SafeAreaView>
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
    alignItems: 'center',
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
    backgroundColor: theme.colors.primary,
  },
  dcontainer: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: scale(45),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: theme.SCREENWIDTH * 0.43,
    marginTop: scale(15),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
