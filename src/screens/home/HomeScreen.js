import {StyleSheet, View, ScrollView, FlatList, Text} from 'react-native';
import React from 'react';
import {CalenderView, Header, PostSection, Story, YardVew} from './components';
import Posts from '../../dummyData/Posts';

const renderItem = ({item}) => {
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
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const handleScroll = event => {
    // alert('call');
    let yOffset = event.nativeEvent.contentOffset.y / 1;
    setScrollPosition(yOffset);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={event => handleScroll(event)}>
      <View style={styles.container}>
        <Header basket />
        <Story />
        <CalenderView hideCal scrollPosition={scrollPosition} />
        <FlatList
          nestedScrollEnabled={true}
          data={Posts}
          renderItem={renderItem}
        />
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
