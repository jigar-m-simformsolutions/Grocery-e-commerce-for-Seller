import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ResetPassword from "./Components/ResetPassword";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute exact path="/" component={Home}  />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/resetpassword" component={ResetPassword} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
