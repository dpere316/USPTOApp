import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthed) {
          return <Component {...rest} {...props} />;
        } else {
          return <Redirect to={"/Home"} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
