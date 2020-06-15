import React, { useState } from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getThemes } from './utils/colorThemes';

import Header from './components/Header/Header';
import LoginForm from './components/LogInForm/LogInForm';
import Chat from './components/Chat/Chat';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './hoc/PrivateRoute/PrivateRoute';
import AuthProvider from './context/Auth';
import EnterNickname from './components/EnterNickname/EnterNickname';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [darkTheme, lightTheme] = getThemes();

  return (
    <AuthProvider>
      <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Switch>
            <Route path="/" exact component={LoginForm} />
            <PrivateRoute path="/nickname">
              <EnterNickname />
            </PrivateRoute>
            <PrivateRoute path="/chat">
              <Chat />
            </PrivateRoute>
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    </AuthProvider>
  );
}

export default App;
