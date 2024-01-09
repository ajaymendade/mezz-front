import React from 'react';
import BuyerDashboardNav from './buyer_DashboardNav';


const BuyerDashboard = ({ isLoggedIn }) => {



  return (
    <>
      <BuyerDashboardNav />
      <div style={{ marginTop: isLoggedIn ? '64px' : 0, padding: '16px', height: '100%' }}>
        
      </div>
    </>
  );
};

export default BuyerDashboard;
