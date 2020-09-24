import React from 'react';
import {Route, Switch, useLocation} from "react-router";
import {ProtectedRoute} from "./rootRoute";
import CreateConfirmModal from "../component/modal/CreateConfirmModal";

function ModalRoute() {
  const location = useLocation();
  let background = location.state && location.state.background;

  return(
    <div>
      <Switch location={background || location}>
        <ProtectedRoute path='/service/modal/:id'>
          <CreateConfirmModal />
        </ProtectedRoute>
      </Switch>
      {background && <Route path="/service/modal/:id" children={<CreateConfirmModal />} />}
    </div>
  )
}
export default ModalRoute
