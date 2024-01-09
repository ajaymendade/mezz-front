import React from 'react';
import DashboardComponents from '../../components/dashboard/DashboardComponents';
import DashboardNav from '../../components/dashboard/DashboardNav';


const Dashboard = ({ isLoggedIn }) => {



  return (
    <>
      <DashboardNav isLoggedIn={isLoggedIn} />
      <div style={{ marginTop: isLoggedIn ? '64px' : 0, padding: '16px', height: '100%' }}>
        <DashboardComponents />
      </div>
    </>
  );
};

export default Dashboard;
