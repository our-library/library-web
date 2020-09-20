import * as React from 'react';
import Nav from "../../component/home/nav/nav";

function WebLayout({children}) {
  return (
    <>
      <div className="webLayoutContainer">
        <Nav/>
        {children}
      </div>
    </>
  )
}

export default WebLayout
