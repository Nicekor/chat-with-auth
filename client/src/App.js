import React, { useState } from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getThemes } from './utils/themes';

import Header from './components/Header/Header';
import LoginForm from './components/LogInForm/LogInForm';
import Chats from './components/Chats/Chats';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthProvider from './context/Auth';
import EnterNickname from './components/EnterNickname/EnterNickname';
import Chat from './components/Chats/Chat/Chat';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [darkTheme, lightTheme] = getThemes();

  return (
    <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <Route path="/" exact>
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
              <LoginForm />
            </Route>
            <PrivateRoute path="/nickname">
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
              <EnterNickname />
            </PrivateRoute>
            <Route path="/chats" exact>
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
              <Chats />
            </Route>
            <Route path="/chat/:chatId" component={Chat} />
            {/* <PrivateRoute path="/chats">
              <Chats />
            </PrivateRoute> */}
            <Route path="*" component={NotFound} />
          </Switch>
        </AuthProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
