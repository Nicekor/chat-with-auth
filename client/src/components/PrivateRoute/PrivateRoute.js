import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...props }) => {
  return (
    <Route
      {...props}
      render={({ location }) => {
        return localStorage.getItem('isAuthenticated') === 'true' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
            exact
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
