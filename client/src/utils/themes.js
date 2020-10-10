import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const getThemes = () => {
  const headerHeight = '5vh';

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
      success: {
        main: '#3cb371',
      },
      text: {
        primary: '#fff',
        secondary: '#eeeeee',
      },
      scrollbar: '#3E4042',
      scrollThumb: '#1C1E21',
    },
    measures: {
      header: {
        height: '6vh',
      },
      body: {
        height: `calc(100vh - ${headerHeight})`,
      },
    },
    zIndex: {
      appBar: 1,
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
        paper: 'beige',
      },
      text: {
        primary: '#9e97c9',
      },
      scrollbar: 'lightgray',
      scrollThumb: 'darkgray',
    },
    measures: {
      header: {
        height: '6vh',
      },
      body: {
        height: `calc(100vh - ${headerHeight})`,
      },
    },
    zIndex: {
      appBar: 1,
    },
  });

  return [responsiveFontSizes(darkTheme), responsiveFontSizes(lightTheme)];
};

export { getThemes };
