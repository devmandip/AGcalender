import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ImageView = ({route}) => {
  const {item} = route.params;
  console.log(item);
  return (
    <View>
      <Text>ImageView</Text>
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({});
