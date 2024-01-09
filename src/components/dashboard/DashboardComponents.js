import React from 'react';
import { Card, CardContent, Typography, Grid, useMediaQuery, Box, List, ListItem, ListItemText } from '@mui/material';


const DashboardCard = ({ title, value }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Card style={{ backgroundColor: '#f0f0f0' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant={isSmallScreen ? 'h5' : 'h4'}>{value}</Typography>
      </CardContent>
    </Card>
  );
};

const Last10Transactions = () => {
  const transactions = [
    { id: 1, name: 'John Doe', amount: '$150.00' },
    { id: 2, name: 'Jane Smith', amount: '$300.00' },
    { id: 3, name: 'Michael Johnson', amount: '$50.00' },
    { id: 1, name: 'John Doe', amount: '$150.00' },
    { id: 2, name: 'Jane Smith', amount: '$300.00' },
    { id: 3, name: 'Michael Johnson', amount: '$50.00' },
    { id: 1, name: 'John Doe', amount: '$150.00' },
    { id: 2, name: 'Jane Smith', amount: '$300.00' },
    { id: 3, name: 'Michael Johnson', amount: '$50.00' },
  ];

  return (
    <Card style={{ marginBottom: '20px', maxWidth: '600px' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" backgroundColor="#4caf50" padding="16px">
          <Typography variant="h6" style={{ color: '#fff' }}>
            Last 10 Transactions
          </Typography>
        </Box>
        <List>
          {transactions.map((transaction) => (
            <ListItem key={transaction.id}>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                      Transaction ID: {transaction.id} | User ID: {transaction.name}
                    </Typography>
                    <Typography variant="h6">{transaction.amount}</Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const Invoices = () => {
  const invoices = [
    { id: 'INV-001', status: 'Paid' },
    { id: 'INV-002', status: 'Pending' },
    { id: 'INV-003', status: 'Expired' },
    { id: 'INV-001', status: 'Paid' },
    { id: 'INV-002', status: 'Pending' },
    { id: 'INV-003', status: 'Expired' },
    { id: 'INV-001', status: 'Paid' },
    { id: 'INV-002', status: 'Pending' },
    { id: 'INV-003', status: 'Expired' },
  ];

  return (
    <Card style={{ marginBottom: '20px', maxWidth: '600px' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" backgroundColor="#3f51b5" padding="16px">
          <Typography variant="h6" style={{ color: '#fff' }}>
            Invoices
          </Typography>
        </Box>
        <List>
          {invoices.map((invoice) => (
            <ListItem key={invoice.id}>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                      <span style={{ marginRight: '10px' }}>Invoice ID: {invoice.id}</span>
                    </Typography>
                    <Typography variant="h6">{invoice.status}</Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};



const DashboardComponents = () => {
  const balance = '₹437645.45';

  return (
    <>
      <Box mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Username" value="User Id" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Balance" value={balance} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Pending invoices" value="2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Tokens" value="56521" />
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <Last10Transactions />
        </Grid>
        <Grid item xs={12} md={6}>
          <Invoices />
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default DashboardComponents;
