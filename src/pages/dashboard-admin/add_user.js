import React, { useState } from 'react';
import AdminDashboardNav from './admin_DashboardNav';
import { Typography, Container, TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';

const AddUser = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    mobile_no: '',
    bank_name: '',
    branch: '',
    ifsc_code: '',
    account_number: '',
    company_name: '',
    tin: '',
    pan_number: '',
    metamask_address: '',
    bank_balance: '',
    userType: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUserTypeChange = (e) => {
    setUserData({ ...userData, userType: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(userData);
  };

  return (
    <>
      <AdminDashboardNav />
      <Container maxWidth="md">
        <Typography variant="h4" align="center" style={{marginTop:10}}  gutterBottom>
          Add User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* User Personal Details */}
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                name="first_name"
                fullWidth
                variant="outlined"
                value={userData.first_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name"
                name="last_name"
                fullWidth
                variant="outlined"
                value={userData.last_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Username"
                name="username"
                fullWidth
                variant="outlined"
                value={userData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                variant="outlined"
                value={userData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                variant="outlined"
                value={userData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                variant="outlined"
                value={userData.confirmPassword}
                onChange={handleChange}
              />
            </Grid>

            {/* User Type Dropdown */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>User Type</InputLabel>
                <Select
                  label="User Type"
                  name="userType"
                  value={userData.userType}
                  onChange={handleUserTypeChange}
                >
                  <MenuItem value="Buyer">Buyer</MenuItem>
                  <MenuItem value="Seller">Seller</MenuItem>
                  <MenuItem value="Escrow">Escrow</MenuItem>
                  <MenuItem value="Lender">Lender</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Other User Details */}
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                variant="outlined"
                value={userData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mobile Number"
                name="mobile_no"
                fullWidth
                variant="outlined"
                value={userData.mobile_no}
                onChange={handleChange}
              />
            </Grid>

            {/* Bank Details */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Bank Name"
                name="bank_name"
                fullWidth
                variant="outlined"
                value={userData.bank_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Branch"
                name="branch"
                fullWidth
                variant="outlined"
                value={userData.branch}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="IFSC Code"
                name="ifsc_code"
                fullWidth
                variant="outlined"
                value={userData.ifsc_code}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Account Number"
                name="account_number"
                fullWidth
                variant="outlined"
                value={userData.account_number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Bank Balance"
                name="bank_balance"
                fullWidth
                variant="outlined"
                value={userData.bank_balance}
                onChange={handleChange}
              />
            </Grid>

            {/* Company Details */}
            <Grid item xs={12}>
              <TextField
                label="Company Name"
                name="company_name"
                fullWidth
                variant="outlined"
                value={userData.company_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tax Identification Number"
                name="tin"
                fullWidth
                variant="outlined"
                value={userData.tin}
                onChange={handleChange}
              />
            </Grid>

            {/* KYC */}
            <Grid item xs={12}>
              <TextField
                label="PAN Number"
                name="pan_number"
                fullWidth
                variant="outlined"
                value={userData.pan_number}
                onChange={handleChange}
              />
            </Grid>

            {/* Metamask Wallet Address */}
            <Grid item xs={12}>
              <TextField
                label="Metamask Wallet Address"
                name="metamask_address"
                fullWidth
                variant="outlined"
                value={userData.metamask_address}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Add User
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default AddUser;
