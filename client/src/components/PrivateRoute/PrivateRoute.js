import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';

const PrivateRoute = ({ children, ...props }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...props}
      render={({ location }) => {
        return isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
