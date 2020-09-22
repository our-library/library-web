import {Route, Switch, useRouteMatch} from "react-router";
import React from "react";
import Index from "../component/register/signIn";
import Index from "../component/register/signUp";

export function RegisterRoute() {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/signIn`} component={Index}/>
      <Route path={`${path}/signUp`} component={Index}/>
      <Route exact path={path} component={Index}/>
    </Switch>
  )
}
