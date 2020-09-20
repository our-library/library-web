import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import Nav from '../../component/home/nav/nav';
import RootRoute from '../../routes/rootRoute';

function Layout() {
  const isAuthorized = true;
  return (
    <>
      <div className="baseContainer">
        {isAuthorized ? (
          <HashRouter>
            <Nav />
            <RootRoute />
          </HashRouter>
        ) : (
          <div>다른페이지</div>
        )}
      </div>
    </>
  );
}

export default Layout;
