import React from 'react';
import { Container, Typography } from '@mui/material';
import SellerDashboardNav from './seller_DashboardNav';

const SellerSettings = () => {
  return (
    <div>
      <SellerDashboardNav />
      <Container maxWidth="md" sx={{ mt: 4 }} style={{marginTop:'63px'}}>
        {/* Content for the Settings page */}
        <Typography variant="h2">Settings Page</Typography>
      </Container>
    </div>
  );
};

export default SellerSettings;
