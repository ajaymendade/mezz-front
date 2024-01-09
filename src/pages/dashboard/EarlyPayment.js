import React from 'react';
import { Container, Typography } from '@mui/material';
import DashboardNav from '../../components/dashboard/DashboardNav';

const EarlyPayment = () => {
  return (
    <div>
      <DashboardNav />
      <Container maxWidth="md" sx={{ mt: 4 }} style={{marginTop:'63px'}}>
        {/* Content for the Early Payment page */}
        <Typography variant="h2">Early Payment Page</Typography>
      </Container>
    </div>
  );
};

export default EarlyPayment;
