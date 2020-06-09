import { createMuiTheme } from '@material-ui/core/styles';

const getThemes = () => {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#eeeeee',
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
        primary: '#fff'
      },
    },
  });
  const lightTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#8fb8ed',
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
    },
  });

  return [darkTheme, lightTheme];
};

export { getThemes };
