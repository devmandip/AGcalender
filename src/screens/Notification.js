import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import {scale, theme} from '../utils';

const data = [
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
  },
  {
    id: 2,
    description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
  },
  {
    id: 3,
    description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
  },
  {
    id: 4,
    description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
  },
  {
    id: 5,
    description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
  },
  {
    id: 6,
    description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
  },
  {
    id: 7,
    description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
  },
  {
    id: 8,
    description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
  },
  {
    id: 9,
    description: 'Lorem ipsum dolor sit amet, indu consectetur adipiscing elit',
  },
];

export default Notification = ({}) => {
  const [notifications, setNotifications] = useState(data);

  return (
    <View style={styles.container}>
      <>
        <FlatList
          style={styles.notificationList}
          enableEmptySections={true}
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View style={styles.notificationBox}>
                <Image
                  style={styles.icon}
                  source={{
                    uri: 'https://img.icons8.com/clouds/100/000000/groups.png',
                  }}
                />
                <Text style={styles.description}>{item.description}</Text>
              </View>
            );
          }}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray,
    flex: 1,
    paddingBottom: scale(10),
  },
  notificationList: {
    // marginTop: 20,
    padding: 10,
    paddingBottom: scale(20),
  },
  notificationBox: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
  },
  icon: {
    width: 45,
    height: 45,
  },
  description: {
    fontSize: 18,
    color: '#3498db',
    marginLeft: 10,
  },
});
