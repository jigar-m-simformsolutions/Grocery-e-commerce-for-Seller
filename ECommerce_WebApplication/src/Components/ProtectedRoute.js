import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector((state) => {
    return state.reducer.isAuthenticated;
  });
  const isVerifying = useSelector((state) => {
    return state.reducer.isVerifying;
  });
  return (
    <Route
      {...rest}
      render={(props) => {
        return isVerifying === true ? (
          <div></div>
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
export default ProtectedRoute;
