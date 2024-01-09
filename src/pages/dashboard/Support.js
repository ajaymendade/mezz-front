import React from 'react';
import { Container, Typography } from '@mui/material';
import DashboardNav from '../../components/dashboard/DashboardNav';

const Support = () => {
  return (
    <div>
      <DashboardNav />
      <Container maxWidth="md" sx={{ mt: 4 }} style={{marginTop:'63px'}}>
        {/* Content for the Support page */}
        <Typography variant="h2">Support Page</Typography>
      </Container>
    </div>
  );
};

export default Support;
