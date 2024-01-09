import React from 'react';
import AdminDashboardNav from './admin_DashboardNav';


const AdminDashboard = ({ isLoggedIn }) => {



  return (
    <>
      <AdminDashboardNav />
      <div style={{ marginTop: isLoggedIn ? '64px' : 0, padding: '16px', height: '100%' }}>
        
      </div>
    </>
  );
};

export default AdminDashboard;
