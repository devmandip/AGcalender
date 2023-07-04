import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale, theme} from '../../../utils';

const SearchBar = props => {
  const {style, placeholder, inputStyle, value, onChangeText} = props;
  return (
    <View style={[styles.container, style]}>
      <AntDesign name="search1" size={15} />
      <TextInput
        value={value}
        onChangeText={ (text)=>onChangeText(text)}
        style={[styles.TextInput_style, inputStyle]}
        placeholder={placeholder ? placeholder : 'Mere Desh Ki Dharti'}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#EAEAEA',
    width: theme.SCREENWIDTH * 0.68,
  },
  TextInput_style: {
    fontSize: scale(16),
    paddingHorizontal: 15,
    paddingVertical: 5,
    // width: '95%',
    // textAlign: '',
    // fontWeight: '',
    fontVariant: 'italic',
  },
});
