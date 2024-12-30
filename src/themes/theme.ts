import { createTheme } from '@mui/material/styles';



const lightThemeOptions  = {
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
        default: '#f5f5f5', // Add default background color for light mode
        paper: '#ffffff', // Add default paper color for cards, etc.
      },
      text: {
        primary: '#000000', // Add text color for light mode
        secondary: '#555555',
      },
  },
};
const darkThemeOptions = {
    palette: {
        type: 'dark',
        primary: {
          main: '#3f51b5',
        },
        secondary: {
          main: '#f50057',
        },
        background: {
            default: '#121212', // Add default background color for dark mode
            paper: '#1e1e1e', // Add default paper color for cards, etc.
          },
          text: {
            primary: '#ffffff', // Add text color for dark mode
            secondary: '#aaaaaa',
          },
      },

}

const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkThemeOptions);

export { lightTheme, darkTheme };
