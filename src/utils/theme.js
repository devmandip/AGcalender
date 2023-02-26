import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const theme = {
  fonts: {
    InterBlack: 'Inter-Black.ttf',
    InterBold: 'Inter-Bold.ttf',
    InterExtraBold: 'Inter-ExtraBold.ttf',
    InterExtraLight: 'Inter-ExtraBold.ttf',
    InterLight: 'Inter-Light.ttf',
    InterMedium: 'Inter-Medium.ttf',
    InterRegular: 'Inter-Regular.ttf',
    InterThin: 'Inter-Thin.ttf',
  },
  colors: {
    primary: '#56AB2F',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#D9D9D9',
    gray1: '#EEEEEE',
    add: '#41416E',
    gray2: '#808080',
  },
  SCREENWIDTH: width,
  SCREENHEIGHT: height,
};

export default theme;
