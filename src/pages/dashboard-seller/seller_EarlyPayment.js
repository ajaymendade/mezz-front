import React from 'react';
import { Container, Typography } from '@mui/material';
import SellerDashboardNav from './seller_DashboardNav';

const SellerEarlyPayment = () => {
  return (
    <div>
      <SellerDashboardNav />
      <Container maxWidth="md" sx={{ mt: 4 }} style={{marginTop:'63px'}}>
        {/* Content for the Early Payment page */}
        <Typography variant="h2">Early Payment Page</Typography>
      </Container>
    </div>
  );
};

export default SellerEarlyPayment;
