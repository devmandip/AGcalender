import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const theme = {
  fonts: {
    josefinSans: 'JosefinSans',
  },
  colors: {
    white: '#FFFFFF',
    black: '#000000',
  },
  SCREENWIDTH: width,
  SCREENHEIGHT: height,
};

export default theme;
