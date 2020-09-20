import React from 'react';
import '../style.scss';
import {HashRouter} from 'react-router-dom';
import RootRoute from "../routes/rootRoute";


function App() {
  return (
    <>
      <HashRouter>
        <RootRoute/>
      </HashRouter>
    </>
  )
}

export default App;
