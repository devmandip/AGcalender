import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Veg from '../../../dummyData/Veg';

const renderItem = ({item}) => {
  console.log('this is item :', item);

  return (
    <View style={styles.renderItem_container}>
      <TouchableOpacity onPress={() => {}}>
        <Image source={item.img} style={styles.renderItem_img} />
      </TouchableOpacity>
      <Text style={styles.renderItem_txt}>{item.name}</Text>
    </View>
  );
};

const Story = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={Veg}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {},

  // renderItem style
  renderItem_container: {
    paddingHorizontal: 7,
    alignItems: 'center',
  },
  renderItem_img: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderRadius: 50,
    // borderColor: "#56AB2F"
  },
  renderItem_txt: {
    marginTop: 2,
    color: 'black',
  },
});
