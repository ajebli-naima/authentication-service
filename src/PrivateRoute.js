 
  import React from "react";
  import { Route, Redirect } from "react-router-dom";
  import { Auth } from 'aws-amplify';

  const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = Auth.currentAuthenticatedUser();
    return (
      <Route
        {...rest}
        render={routeProps =>
          !!currentUser ? (
            <RouteComponent {...routeProps} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  };
  
  
  export default PrivateRoute;