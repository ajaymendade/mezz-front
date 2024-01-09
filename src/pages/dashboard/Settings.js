import React from 'react';
import { Container, Typography } from '@mui/material';
import DashboardNav from '../../components/dashboard/DashboardNav';

const Settings = () => {
  return (
    <div>
      <DashboardNav />
      <Container maxWidth="md" sx={{ mt: 4 }} style={{marginTop:'63px'}}>
        {/* Content for the Settings page */}
        <Typography variant="h2">Settings Page</Typography>
      </Container>
    </div>
  );
};

export default Settings;
