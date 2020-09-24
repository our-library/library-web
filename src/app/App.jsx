import React from 'react';
import '../style.scss';
import {BrowserRouter} from 'react-router-dom';
import RootRoute from "../routes/rootRoute";
import ModalRoute from "../routes/modalRoute";


function App() {
  return (
    <BrowserRouter>
      <RootRoute/>
    </BrowserRouter>
  )
}

export default App;
