import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axiosInstance from '../../../pages/axios.js'; // Import your Axios instance

const UpdateModal = ({ profileData, handleCloseModal, setProfileData }) => {
  const [updatedProfileData, setUpdatedProfileData] = useState(profileData);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Check if a valid JWT token exists in local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Set the token in Axios instance headers for authorization
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Use the Axios instance to make the PUT request to update the user's profile data
      axiosInstance.put('/profile', updatedProfileData)
        .then(response => {
          setProfileData(updatedProfileData);
          setSuccessMessage('Profile updated successfully.');
          handleCloseModal();
        })
        .catch(error => console.error('Error updating user data:', error));
    } else {
      // No valid token found, handle authentication error
      console.error('No valid JWT token found.');
      // You can show an error message or redirect to the login page here.
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
  };


  return (
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      minWidth: '300px',
      maxWidth: '80vw', // Set a maximum width for the modal
      maxHeight: '80vh', // Set a maximum height for the modal
      overflowY: 'auto', // Enable vertical scrolling if content exceeds the height
      outline: 'none',
      borderRadius: '8px',
    }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Edit Profile
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="First Name"
          name="first_name"
          value={updatedProfileData.first_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={updatedProfileData.last_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={updatedProfileData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={updatedProfileData.address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mobile No"
          name="mobile_no"
          value={updatedProfileData.mobile_no}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        {/* Bank Details */}
        <TextField
          label="Bank Name"
          name="bank_name"
          value={updatedProfileData.bank_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Branch"
          name="branch"
          value={updatedProfileData.branch}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="IFSC Code"
          name="ifsc_code"
          value={updatedProfileData.ifsc_code}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Account Number"
          name="account_number"
          value={updatedProfileData.account_number}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        {/* KYC */}
        <TextField
          label="Company Name"
          name="company_name"
          value={updatedProfileData.company_name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="TIN"
          name="tin"
          value={updatedProfileData.tin}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="PAN Number"
          name="pan_number"
          value={updatedProfileData.pan_number}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button type="button" variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" sx={{ ml: 2 }}>
            Save
          </Button>
        </Box>
      </form>

      <Snackbar open={Boolean(successMessage)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default UpdateModal;
