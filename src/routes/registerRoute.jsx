import {Route, Switch, useRouteMatch} from "react-router";
import React from "react";
import SignIn from "../component/register/signIn";
import SignUp from "../component/register/signUp";

export function RegisterRoute() {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/signIn`} component={SignIn}/>
      <Route path={`${path}/signUp`} component={SignUp}/>
      <Route exact path={path} component={SignIn}/>
    </Switch>
  )
}
