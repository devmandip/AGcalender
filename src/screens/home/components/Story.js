import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import React, {useState} from 'react';
import {Veg} from '../../../dummyData/Veg';
import {images, scale, theme} from '../../../utils';
import {Label} from '../../../components';

const Story = props => {
  const [selectCat, setCategory] = useState(null);
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.renderItem_container} key={index}>
        <TouchableOpacity
          onPress={() => {
            setCategory(index);
            props.selectPress(item);
          }}
          style={{
            borderWidth: selectCat === index ? scale(1.3) : 0,
            borderColor: theme.colors.green,
            padding: scale(3),
            borderRadius: scale(35),
          }}>
          {item?.displayName && (
            <UserAvatar
              // bgColors={{backgroundColor: '#FFF'}}
              size={70}
              name={item?.displayName}
              src={item?.imageUrlOrig ?? null}
              style={styles.renderItem_img}
            />
          )}
          {/* <Image
            source={{uri: item?.imageUrlOrig}}
            style={styles.renderItem_img}
          /> */}
        </TouchableOpacity>
        <Label
          title={item?.displayName}
          style={{
            fontFamily: theme.fonts.InterMedium,
            color: selectCat === index ? 'black' : 'gray',
            width: '75%',
            textAlign: 'center',
          }}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={props.listData}
        extraData={props.listData}
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
    resizeMode: 'contain',
    // borderColor: "#56AB2F"
  },
  renderItem_txt: {
    marginTop: 2,
    color: 'black',
  },
});
