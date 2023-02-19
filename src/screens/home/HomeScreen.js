import {StyleSheet, View, ScrollView, FlatList} from 'react-native';
import React from 'react';
import {CalenderView, Header, PostSection, Story} from './components';
import Posts from '../../dummyData/Posts';

const renderItem = ({item}) => {
  return (
    <View>
      <PostSection />
    </View>
  );
};

const HomeScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header />
        <Story />
        <CalenderView />
        {/* <FlatList data={Posts} renderItem={renderItem} /> */}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingHorizontal: 10,
  },
});
