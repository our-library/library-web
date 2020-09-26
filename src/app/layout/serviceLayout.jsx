import React from 'react';
import ActionBar from '../../component/actionBar';

function ServiceLayout({ children }) {
  return (
<<<<<<< Updated upstream
    <>
      <div className="serviceLayoutContainer">
        <ActionBar />
        {children}
      </div>
    </>
  );
=======
    <div className="serviceLayoutContainer">
      <ActionBar/>
      {children}
    </div>
  )
>>>>>>> Stashed changes
}

export default ServiceLayout;
