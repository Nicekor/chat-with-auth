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
import Chat from './components/Chats/Chat/Chat';
import FriendRequests from './components/FriendRequests/FriendRequests';
import SocketProvider from './context/SocketCtx';

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
          <PrivateRoute path="/friend-requests" exact>
            <FriendRequests />
          </PrivateRoute>
          <PrivateRoute path="/chats" exact>
            <SocketProvider>
              <Header darkMode={darkMode} setDarkMode={setDarkMode} />
              <Chats />
            </SocketProvider>
          </PrivateRoute>
          <PrivateRoute path="/chat/:chatId" exact>
            <SocketProvider>
              <Chat />
            </SocketProvider>
          </PrivateRoute>
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
