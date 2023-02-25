import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Header from './Header';

const ImageView = ({route}) => {
  const {imgURI, Time} = route.params;

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const CurrentDate = `${date}/${month}/${year}`;

  return (
    <View style={styles.container}>
      <Header title="Add Corp Photos/Videos" />

      <View style={styles.view1}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.txt}>{CurrentDate}</Text>
          <Text style={[styles.txt, {left: 20}]}>{Time}</Text>
        </View>
        <Text style={styles.txt}>Ludhiyana</Text>
      </View>

      <Image source={{uri: imgURI}} style={styles.ImageView} />
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  view1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  txt: {
    color: 'black',
  },
  ImageView: {
    height: 550,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 15,
  },
});
