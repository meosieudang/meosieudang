import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser } from "./actions/authAction";
import jwt_decode from "jwt-decode";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import setAuthToken from "./ultils/setAuthToken";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DetailProfile from "./components/LicensePlates/DetailProfile";
import Navbar from "./components/Navbar/Navbar";
import ListSeat from "./components/ListSeat/ListSeat";
import Dashboard from "./components/Dashboard/Dashboard";
import Diagram from "./components/Diagram/Diagram";
import PrivateRoute from "./common/PrivateRoute";
import Revenue from "./components/Revenue/Revenue";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ListDiagram from "./components/Diagram/ListDiagram";

//check token
if (localStorage.jwtToken) {
  //set auth header
  setAuthToken(localStorage.jwtToken);
  //decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //check exp token
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  //   //logout user
  //   store.dispatch(logOutUser());

  //   //redirect /login
  //   window.location.href = "/";
  // }
}
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/revenue" exact component={Revenue} />
          <PrivateRoute path="/dashboard/:id" exact component={DetailProfile} />
          <PrivateRoute path="/dashboard/detail/:id" component={ListSeat} />
          <PrivateRoute path="/diagram/:id" component={Diagram} />
          <PrivateRoute path="/list/:id" component={ListDiagram} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
