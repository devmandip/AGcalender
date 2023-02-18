import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const theme = {
  fonts: {
    josefinSans: 'JosefinSans',
  },
  colors: {
    primary: '#56AB2F',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#D9D9D9',
  },
  SCREENWIDTH: width,
  SCREENHEIGHT: height,
};

export default theme;
