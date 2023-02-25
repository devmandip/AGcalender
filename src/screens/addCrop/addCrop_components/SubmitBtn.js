import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const SubmitBtn = props => {
  const {onPress,style} = props;

  return (
    <TouchableOpacity style={[styles.container,style]} onPress={onPress}>
      <Text style={styles.txt}>Submit</Text>
    </TouchableOpacity>
  );
};

export default SubmitBtn;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#56AB2F',
  },
  txt: {
    fontSize: 20,
    fontWeight: '900',
    color: 'white',
  },
});
