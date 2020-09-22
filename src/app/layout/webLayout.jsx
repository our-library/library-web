import React from 'react';
import Index from "../../component/nav";

function WebLayout({children}) {
  return (
    <>
      <div className="webLayoutContainer">
        <Index/>
        {children}
      </div>
    </>
  )
}

export default WebLayout
