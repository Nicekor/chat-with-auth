import React, { useState } from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getThemes } from './utils/colorThemes';

import Header from './components/Header/Header';
import LoginForm from './components/LogInForm/LogInForm';
import NotFound from './components/NotFound/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [darkTheme, lightTheme] = getThemes();

  return (
    <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Switch>
          <Route path="/" exact component={LoginForm} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
