import { createTheme } from '@mui/material/styles';
import { blueGrey, teal, red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
  palette: {
    background: {
      default: '#464646',
    },
    primary: {
      main: '#3FC0C9',
    },
    secondary: {
      main: '#EFEA5A',
      background: '#B9B09E',
    },
    third: {
      main: '#9E7E66',
    },
    error: {
      main: '#FF0000',
    },
    text: {
      primary: '#fff',
    },
  },

  // components: {
  //   MuiSelect: {
  //     icon: {
  //       color: '#fff', // Color for the arrow icon in the Select component
  //     },
  //   },
  //   MuiMenuItem: {
  //     styleOverrides: {
  //       root: {
  //         '&.Mui-MenuItem:hover': {
  //           backgroundColor: 'yellow', // Background color for the hovered option
  //         },

  //         '&.Mui-selected': {
  //           backgroundColor: teal[700], // Background color for the selected option
  //         },
  //         '&.Mui-focused': {
  //           backgroundColor: teal[500], // Background color for the focused option
  //         },
  //         '&.Mui-MenuItem-root': {
  //           backgroundColor: 'black', // Background color for the option
  //           paddingLeft: 16, // Left padding for the option
  //           paddingRight: 16, // Right padding for the option
  //         },
  //       },
  //     },
  //   },
  //   MuiMenu: {
  //     styleOverrides: {
  //       paper: {
  //         backgroundColor: 'black', // Background color for the menu
  //       },
  //     },
  //   },
  // },
});

export default theme;
