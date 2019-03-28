import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { setCurrentUser, logOutUser } from "./actions/authAction";
import jwt_decode from "jwt-decode";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import setAuthToken from "./ultils/setAuthToken";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import DetailProfile from "./components/LicensePlates/DetailProfile";
import Navbar from "./components/Navbar/Navbar";
import ListSeat from "./components/ListSeat/ListSeat";
import Dashboardv2 from "./components/Dashboard/Dashboardv2";
import Diagram from "./components/Diagram/Diagram";

//check token
if (localStorage.jwtToken) {
  //set auth header
  setAuthToken(localStorage.jwtToken);
  //decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check exp token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logOutUser());

    //redirect /login
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" exact component={Dashboardv2} />
            <Route path="/dashboard/:id" exact component={DetailProfile} />
            <Route path="/dashboard/detail/:id" component={ListSeat} />
            <Route path="/diagram/:id" component={Diagram} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
