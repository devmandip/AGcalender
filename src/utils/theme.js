import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const theme = {
  fonts: {
    InterBlack: 'Inter-Black',
    InterBold: 'Inter-Bold.ttf',
    InterExtraBold: 'Inter-ExtraBold',
    InterExtraLight: 'Inter-ExtraBold',
    InterLight: 'Inter-Light',
    InterMedium: 'Inter-Medium',
    InterRegular: 'Inter-Regular',
    InterThin: 'Inter-Thin',
    poetic: 'Isiniscript-lOJy',
  },
  colors: {
    primary: '#007a3c', // '#56AB2F',
    green: '#007a3c',
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
