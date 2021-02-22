import React, { Fragment, useEffect } from "react";
// * Routing
import { Switch, Route } from "react-router-dom";
import Signin from "./Components/Auth/Signin";
import Signup from "./Components/Auth/Signup";
import Menus from "./Components/Menu/Menus";
import UserRouter from "./Routing/UserRouter";
import Outproduct from "./Components/Products/Outproduct";
import Shop from "./Components/Shop/Shop";
import ShopAdd from "./Components/Shop/ShopAdd";

// * Redux
import store from "./redux/Store";
import { loadUser } from "./redux/action/auth";
import setAuthToken from "./redux/utils/setAuthToken";
import { LOGOUT } from "./redux/action/types";


function App() {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Fragment>
      <Menus />
      <Switch>
        <Route exact path="/" component={Outproduct} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        {/* <UserRouter path="/product" component={Products} /> */}
        <UserRouter path="/myshop" component={Shop} />
        <UserRouter path="/addshop" component={ShopAdd}/>
      </Switch>
    </Fragment>
  );
}

export default App;
