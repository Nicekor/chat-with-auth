import { createMuiTheme } from '@material-ui/core/styles';

const getThemes = () => {
  const darkTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#1F2833',
      },
      secondary: {
        main: '#6F2232',
      },
      background: {
        default: '#1A1A1D',
      },
      error: {
        main: '#e43f5a',
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
    },
  });

  return [darkTheme, lightTheme];
};

export {getThemes};
