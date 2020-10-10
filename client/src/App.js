import React, { useState } from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getThemes } from './utils/themes';

import Header from './components/Header/Header';
import LoginForm from './components/LogInForm/LogInForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import Chats from './components/Chats/Chats';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import EnterNickname from './components/EnterNickname/EnterNickname';
import Chat from './components/Chats/Chat/Chat';
import FriendRequests from './components/FriendRequests/FriendRequests';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [darkTheme, lightTheme] = getThemes();

  return (
    <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <LoginForm />
          </Route>
          <Route path="/register" exact>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <RegisterForm />
          </Route>
          <Route path="/nickname" exact>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <EnterNickname />
          </Route>
          <PrivateRoute path="/chats" exact>
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <Chats />
          </PrivateRoute>
          <PrivateRoute path="/chat/:chatId" component={Chat} />
          <PrivateRoute path="/friend-requests" exact>
            <FriendRequests />
          </PrivateRoute>
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
