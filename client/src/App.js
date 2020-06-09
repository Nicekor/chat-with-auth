import React, { useState } from 'react';

import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { getThemes } from './utils/colorThemes';

import Header from './components/Header/Header';
import LoginForm from './components/LogInForm/LogInForm';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [darkTheme, lightTheme] = getThemes();

  return (
    <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <LoginForm />
    </MuiThemeProvider>
  );
}

export default App;
