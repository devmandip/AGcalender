import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

const TxtInput = props => {
  const {width, title, onTouchStart} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>{title}</Text>
      <TextInput
        {...props}
        onTouchStart={onTouchStart}
        style={[styles.txtinput, props.style, {width: width}]}
      />
    </View>
  );
};

export default TxtInput;

const styles = StyleSheet.create({
  container: {},
  headerTxt: {
    color: 'black',
    fontWeight: '600',
  },
  txtinput: {
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 0,
    height: 50,
    color: 'black',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    marginTop: 5,
  },
});
