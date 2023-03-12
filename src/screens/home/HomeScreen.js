import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {CalenderView, Header, PostSection, Story, YardVew} from './components';
import Posts from '../../dummyData/Posts';
import {DrawerModal} from '../../components';
import {theme} from '../../utils';
import Toast from '../../components/Toast';

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
  const [drawerModal, setDrawerModel] = useState(false);
  const handleScroll = event => {
    // alert('call');
    let yOffset = event.nativeEvent.contentOffset.y / 1;
    setScrollPosition(yOffset);
  };
  return (
    <SafeAreaView style={{backgroundColor: theme.colors.white}}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onScroll={event => handleScroll(event)}>
        <View style={styles.container}>
          <Header
            basket
            onPressMenu={() => {
              setDrawerModel(true);
            }}
          />
          <Story />
          <CalenderView hideCal scrollPosition={scrollPosition} />

          <FlatList
            nestedScrollEnabled={true}
            data={Posts}
            renderItem={renderItem}
            keyExtractor={(item, index) => item?.id}
          />
        </View>
        <DrawerModal
          isVisible={drawerModal}
          close={() => {
            setDrawerModel(false);
          }}
        />
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          Toast.show('this is long text', Toast.LONG);
        }}>
        <Text>press me</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
