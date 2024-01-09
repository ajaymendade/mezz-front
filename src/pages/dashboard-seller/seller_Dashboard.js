import React from 'react';
import SellerDashboardNav from './seller_DashboardNav';

const SellerDashboard = ({ isLoggedIn }) => {



  return (
    <>
      <SellerDashboardNav isLoggedIn={isLoggedIn} />
      <div style={{ marginTop: isLoggedIn ? '64px' : 0, padding: '16px', height: '100%' }}>

      </div>
    </>
  );
};

export default SellerDashboard;
