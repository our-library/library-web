import React from 'react';
import ActionBar from '../../component/actionBar';

function ServiceLayout({ children }) {
  return (
    <>
      <div className="serviceLayoutContainer">
        <ActionBar />
        {children}
      </div>
    </>
  );
}

export default ServiceLayout;
