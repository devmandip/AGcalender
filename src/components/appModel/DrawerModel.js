import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {scale, theme} from '../../utils';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/core';
import {
  AboutAgMart,
  hiw,
  MarketIntelligence,
  PrivacyPolicy,
  TermsofUse,
  whyhc,
} from '../../utils/MockData';

const DrawerModal = props => {
  const {isVisible, close} = props;
  const navigation = useNavigation();
  return (
    <Modal
      backdropOpacity={0.4}
      visible={isVisible}
      onRequestClose
      animationIn="slideOutLeft"
      animationOut="slideInLeft"
      animationInTiming={0.5}
      style={{width: '65%', margin: 0}}>
      <View style={styles.container}>
        <Icon
          name="x"
          size={scale(22)}
          color={theme.colors.black}
          onPress={() => close()}
          style={{
            marginTop: scale(20),
            marginRight: scale(10),
            alignSelf: 'flex-end',
          }}
        />
        <View
          style={{
            marginLeft: scale(25),
            marginTop: scale(30),
          }}>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => {
              close();
              navigation.navigate('Static', {data: whyhc});
            }}>
            <Icon name="calendar" size={25} color={theme.colors.purpal} />
            <Text style={styles.btnText}>Why Harvesting calendar </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => {
              close();
              navigation.navigate('Static', {data: hiw});
            }}>
            <Icon name="help-circle" size={25} color={theme.colors.purpal} />
            <Text style={styles.btnText}>How it work</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => {
              close();
              navigation.navigate('Static', {data: MarketIntelligence});
            }}>
            <Icon name="codepen" size={25} color={theme.colors.purpal} />
            <Text style={styles.btnText}>Market intelligence </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.textButton}
            onPress={() => {
              close();
              navigation.navigate('Static', {data: AboutAgMart});
            }}>
            <Icon name="info" size={25} color={theme.colors.purpal} />
            <Text style={styles.btnText}>About AgMart </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => {
              close();
              navigation.navigate('Static', {data: TermsofUse});
            }}>
            <Icon name="book-open" size={25} color={theme.colors.purpal} />
            <Text style={styles.btnText}>Terms of use</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => {
              close();
              navigation.navigate('Static', {data: PrivacyPolicy});
            }}>
            <Icon name="check" size={25} color={theme.colors.purpal} />
            <Text style={styles.btnText}>Privacy policy </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => {
              close();
              navigation.navigate('ContactUs');
            }}>
            <Icon name="phone" size={25} color={theme.colors.purpal} />
            <Text style={styles.btnText}>Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DrawerModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: scale(20),
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 111,
  },
  label: {color: theme.colors.black, fontSize: scale(14), fontWeight: '500'},
  activityIndicatorWrapper: {
    backgroundColor: theme.colors.white,
    // height: theme.SCREENHEIGHT * 0.2,
    width: theme.SCREENWIDTH * 0.92,
    borderRadius: scale(10),
    // paddingVertical:scale(20),
    padding: scale(10),
    zIndex: 111,
    marginTop: -theme.SCREENHEIGHT * 0.01,
  },
  container: {
    flex: 1,
    padding: scale(5),
    // borderWidth: 1,
    backgroundColor: theme.colors.white,
    borderTopRightRadius: scale(25),
    borderBottomRightRadius: scale(25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  textButton: {
    flexDirection: 'row',
    marginVertical: scale(10),
    alignItems: 'center',
  },
  btnText: {
    marginLeft: scale(10),
    fontWeight: '600',
    fontFamily: theme.fonts.josefinSans,
    color: theme.colors.black,
  },
  link: {
    marginVertical: scale(10),
    color: theme.colors.linkColor,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
