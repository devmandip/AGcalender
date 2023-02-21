import {StyleSheet, View, ScrollView, FlatList, Text} from 'react-native';
import React from 'react';
import {CalenderView, Header, PostSection, Story} from './components';
import Posts from '../../dummyData/Posts';

const renderItem = ({item}) => {
  console.log('this is post Data :', JSON.stringify(item, null, 4));

  return (
    <PostSection
      postImages={item.postedImages}
      proicePic={item.profileImg}
      name={item.name}
      description={item.description}
      view_count={item.ViewCount}
      like_count={item.likeCount}
    />
  );
};

const HomeScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Header />
        <Story />
        <CalenderView />
        <FlatList data={Posts} renderItem={renderItem} />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 60,
  },
});
