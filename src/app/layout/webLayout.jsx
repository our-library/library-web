import React from 'react';
import Nav from "../../component/nav";

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
