import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Signin = () => {
  return (
    <View style={styles.container}>
      <Text>Signin</Text>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
