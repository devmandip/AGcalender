import {Linking, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Header} from './home/components';
import {Button, InputBox, Label, Title} from '../components';
import {scale, theme} from '../utils';
import {temars1, temars2} from '../utils/MockData';

const ContactUs = ({navigation}) => {
  //
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [msg, setmsg] = useState();
  const handleSubmit = () => {
    Linking.openURL(`mailto:lokesh2910@gmail.com?subject=${name}&body=${msg}`);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPressMenu={() => {
          navigation.goBack();
        }}
      />
      <Title title="Contact Us" />
      <Label title="Let’s Get in Touch" style={styles.subTitle} />
      <View style={styles.contactForm}>
        <Label title="Name" />
        <InputBox
          value={name}
          onChangeText={txt => {
            setName(txt);
          }}
        />
        <Label
          title="Email"
          value={email}
          onChangeText={txt => {
            setEmail(txt);
          }}
        />
        <InputBox />
        <Label
          title="Message"
          value={msg}
          onChangeText={txt => {
            setmsg(txt);
          }}
        />
        <InputBox />
        <Button
          onPress={() => {
            handleSubmit();
          }}
          title="Send"
          style={styles.btn}
          titleStyle={styles.btnTxt}
        />
      </View>
    </SafeAreaView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(10),
  },
  subTitle: {
    marginTop: scale(10),
    marginLeft: scale(20),
  },
  contactForm: {
    marginTop: theme.SCREENHEIGHT * 0.05,
    margin: scale(10),
  },
  btn: {
    marginTop: scale(25),
  },
  btnTxt: {
    fontSize: scale(14),
    fontWeight: '600',
  },
});
