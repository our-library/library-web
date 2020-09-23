import React from 'react';
import ServiceLayout from "../../app/layout/serviceLayout";
import ActionBar from "../actionBar";
import BookList from "../bookList";
import ServiceRoute from "../../routes/serviceRoute";

function ServiceMain() {
  return (
    <>
      <div className="serviceLayoutContainer">
        <ActionBar />
        <ServiceRoute />
      </div>
    </>
  )
}

export default ServiceMain
