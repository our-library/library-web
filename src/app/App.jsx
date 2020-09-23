import React from 'react';
import '../style.scss';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import RootRoute from "../routes/rootRoute";


function App() {
  return (
    <>
      <BrowserRouter>
        <RootRoute/>
      </BrowserRouter>
    </>
  )
}

export default App;
