import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <AntDesign name="search1" size={15} />
      <TextInput
        style={styles.TextInput_style}
        placeholder="Mere Desh Ki Dharti"
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
    width: 280,
  },
  TextInput_style: {
    fontSize: 14,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: '95%',
    textAlign: 'center',
  },
});
