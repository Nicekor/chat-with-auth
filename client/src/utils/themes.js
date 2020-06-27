import { createMuiTheme } from '@material-ui/core/styles';

const getThemes = () => {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#eeeeee',
        dark: '#18191A',
      },
      secondary: {
        main: '#4ecca3',
      },
      background: {
        default: '#232931',
        paper: '#393e46',
      },
      error: {
        main: '#e43f5a',
      },
      text: {
        primary: '#fff',
        secondary: '#eeeeee',
      },
      scrollbar: '#3E4042',
      scrollThumb: '#1C1E21',
    },
    measures: {
      headerMaxHeight: '6vh',
    },
  });
  const lightTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#8fb8ed',
        dark: 'lightgray',
      },
      secondary: {
        main: '#c2bbf0',
      },
      background: {
        default: '#f1e3f3',
      },
      text: {
        primary: '#9e97c9',
      },
      scrollbar: 'lightgray',
      scrollThumb: 'darkgray',
    },
    measures: {
      headerMaxHeight: '6vh',
    },
  });

  return [darkTheme, lightTheme];
};

export { getThemes };
