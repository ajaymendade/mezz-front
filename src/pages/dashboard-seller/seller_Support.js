import React from 'react';
import { Container, Typography } from '@mui/material';
import SellerDashboardNav from './seller_DashboardNav';

const SellerSupport = () => {
  return (
    <div>
      <SellerDashboardNav />
      <Container maxWidth="md" sx={{ mt: 4 }} style={{marginTop:'63px'}}>
        {/* Content for the Support page */}
        <Typography variant="h2">Support Page</Typography>
      </Container>
    </div>
  );
};

export default SellerSupport;
