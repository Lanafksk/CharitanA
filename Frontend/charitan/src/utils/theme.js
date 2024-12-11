import { pink } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // primary.main color (blue)
    },
    secondary: {
      main: '#dc004e', // secondary.main color (pink)
    },
    background: {
      default: '#f5f5f5', // background.default color (light grey)
      black: '#000000', // background.black color
      white: '#ffffff', // background.white color
    },
    fontcolor: {
      default: '#000000', // fontcolor.default color (black)
      white: '#ffffff', // fontcolor.white color
      pink: 'fb1465', // fontcolor.pink color
      successgreen: '00FF26', // fontcolor.successgreen color
    },
    element: {
      default: '#ffffff', // element.default color (white)
      pink: '#fb1465', // element.pink color
    },
  },
});

export default theme;
