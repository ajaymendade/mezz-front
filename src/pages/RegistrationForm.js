import React, { useState } from 'react';
import axios from 'axios';
import axiosInstance from './axios.js'; 
import {
  Container,
  TextField,
  Button,
  Grid,
  Snackbar,
  Typography,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
  Person,
  Business,
  AccountBalance,
  BusinessCenter,
  Payment,
  CreditCard,
  ContactMail,
} from '@mui/icons-material';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    address: '',
    mobile_no: '',
    confirmPassword: '',
    bank_name: '',
    branch: '',
    ifsc_code: '',
    account_number: '',
    company_name: '',
    tin: '',
    pan_number: '',
    metamask_address: '',
    bank_balance: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/register', formData)
      .then(function (response) {
        // Store the JWT token in local storage
        localStorage.setItem('token', response.data.access_token);
        // Update success message
        setSuccessMessage(response.data.message);
        // Clear form data
        setFormData({
          first_name: '',
          last_name: '',
          username: '',
          email: '',
          password: '',
          address: '',
          mobile_no: '',
          confirmPassword: '',
          bank_name: '',
          branch: '',
          ifsc_code: '',
          account_number: '',
          company_name: '',
          tin: '',
          pan_number: '',
          metamask_address: '',
          bank_balance: '',
        });
        // Optional: Redirect to another page after successful registration
        // window.location.href = '/login'; // or to any other route
      })
      .catch(function (error) {
        console.error(error.response?.data?.error || 'Unknown error');
        setErrorMessage(error.response?.data?.error || 'Unknown error');
      });
  };
  
  const handleCloseSnackbar = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Registration Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="First Name"
              name="first_name"
              fullWidth
              variant="outlined"
              value={formData.first_name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Last Name"
              name="last_name"
              fullWidth
              variant="outlined"
              value={formData.last_name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ContactMail />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              fullWidth
              variant="outlined"
              value={formData.address}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              name="mobile_no"
              fullWidth
              variant="outlined"
              value={formData.mobile_no}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ContactMail />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Bank Details */}
          <Grid item xs={12}>
            <TextField
              label="Bank Name"
              name="bank_name"
              fullWidth
              variant="outlined"
              value={formData.bank_name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBalance />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Branch"
              name="branch"
              fullWidth
              variant="outlined"
              value={formData.branch}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessCenter />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="IFSC Code"
              name="ifsc_code"
              fullWidth
              variant="outlined"
              value={formData.ifsc_code}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Payment />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Account Number"
              name="account_number"
              fullWidth
              variant="outlined"
              value={formData.account_number}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCard />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bank Balance" // Label for bank_balance
              name="bank_balance" // Name for bank_balance
              fullWidth
              variant="outlined"
              value={formData.bank_balance} // Value for bank_balance
              onChange={handleChange} // Handle change for bank_balance
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBalance />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Company Details */}
          <Grid item xs={12}>
            <TextField
              label="Company Name"
              name="company_name"
              fullWidth
              variant="outlined"
              value={formData.company_name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Business />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tax Identification Number"
              name="tin"
              fullWidth
              variant="outlined"
              value={formData.tin}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCard />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* KYC */}
          <Grid item xs={12}>
            <TextField
              label="PAN Number"
              name="pan_number"
              fullWidth
              variant="outlined"
              value={formData.pan_number}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreditCard />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
           <TextField
        label="Metamask Wallet Address"
        name="metamask_address"
        fullWidth
        variant="outlined"
        value={formData.metamask_address}
        onChange={handleChange}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    {/* Add the Metamask icon here */}
                </InputAdornment>
            ),
        }}
    />
</Grid>


          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
          Have an account?{' '}
          <Link href="/login" variant="body2">
            Log in here
          </Link>
        </Grid>
      </form>

      <Snackbar open={Boolean(errorMessage)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </MuiAlert>
      </Snackbar>

      <Snackbar open={Boolean(successMessage)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default RegistrationForm;
