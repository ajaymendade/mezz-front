import React from 'react';
import AdminDashboardNav from './admin_DashboardNav';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TotalUsers = () => {
  // Sample data (replace with actual data from the database)
  const usersData = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      username: 'john_doe',
      email: 'john@example.com',
      address: '123 Main St',
      mobile_no: '123-456-7890',
      bank_name: 'Sample Bank',
      branch: 'Sample Branch',
      ifsc_code: 'SAMPLE1234',
      account_number: '1234567890123456',
      company_name: 'Sample Company',
      tin: 'SAMPLETIN123',
      pan_number: 'SAMPLEPAN123',
      metamask_address: '0x1234567890abcdef',
      bank_balance: '$10,000',
      userType: 'Buyer',
    },
    // Add more sample data as needed
  ];

  return (
    <>
      <AdminDashboardNav />
      <div style={{ marginTop: 10, textAlign: 'center' }}>
        <Typography style={{ fontSize: 30 }}>Total Users</Typography>
      </div>
      <TableContainer component={Paper} style={{ margin: '20px auto', maxWidth: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Bank Name</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>IFSC Code</TableCell>
              <TableCell>Account Number</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>TIN</TableCell>
              <TableCell>PAN Number</TableCell>
              <TableCell>Metamask Address</TableCell>
              <TableCell>Bank Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.userType}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.mobile_no}</TableCell>
                <TableCell>{user.bank_name}</TableCell>
                <TableCell>{user.branch}</TableCell>
                <TableCell>{user.ifsc_code}</TableCell>
                <TableCell>{user.account_number}</TableCell>
                <TableCell>{user.company_name}</TableCell>
                <TableCell>{user.tin}</TableCell>
                <TableCell>{user.pan_number}</TableCell>
                <TableCell>{user.metamask_address}</TableCell>
                <TableCell>{user.bank_balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TotalUsers;
