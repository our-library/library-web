import React from 'react';
import ActionBar from '../actionBar';
import ServiceRoute from "../../routes/serviceRoute";

function ServiceMain() {
  return (
    <div className="serviceLayoutContainer">
      <ActionBar/>
      <ServiceRoute/>
    </div>
  )
}

export default ServiceMain;
