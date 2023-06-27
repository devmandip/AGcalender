import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale, theme} from '../utils';

const Toast = props => {
  return (
    <>
      <View style={styles.container}>
        <Text style={{color: 'black', fontSize: scale(10)}}>
          {props.tagName}
        </Text>
      </View>
      <View
        style={{
          width: 0,
          height: 0,
          borderBottomWidth: 20,
          borderLeftWidth: 20,
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: theme.colors.gray1,
          borderLeftColor: 'transparent',
          transform: [{rotate: '45deg'}],
          position: 'absolute',
          bottom: 45,
        }}></View>
    </>
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    width: scale(100),
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: theme.colors.gray1,
    position: 'absolute',
    bottom: 50,
  },
});
