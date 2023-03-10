import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Veg} from '../../../dummyData/Veg';
import {scale, theme} from '../../../utils';
import { Label } from '../../../components';

const Story = () => {
  const [selectCat, setCategory] = useState(null);
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.renderItem_container} key={index}>
        <TouchableOpacity
          onPress={() => {
            setCategory(index);
          }}
          style={{
            borderWidth: selectCat === index ? scale(1.3) : 0,
            borderColor: theme.colors.green,
            padding: scale(3),
            borderRadius: scale(35),
          }}>
          <Image source={item.img} style={styles.renderItem_img} />
        </TouchableOpacity>
        <Label title={item.name} />
      </View>
    );
  };
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
    height: scale(60),
    width: scale(60),
    // borderWidth: 1,
    borderRadius: 50,
    // borderColor: "#56AB2F"
  },
  renderItem_txt: {
    marginTop: 2,
    color: 'black',
  },
});
