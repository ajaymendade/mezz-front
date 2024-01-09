import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, Typography, Container, Box, useMediaQuery, CircularProgress, Modal, Button } from '@mui/material';
import DashboardNav from '../../components/dashboard/DashboardNav';
import axiosInstance from '../axios.js'; // Import your Axios instance
import Avataaars from 'avataaars';
import UpdateModal from "../../components/dashboard/profilepage/UpdateModal";
import { useHistory } from 'react-router-dom';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const history = useHistory();

  useEffect(() => {
    // Check if a valid JWT token exists in local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Set the token in Axios instance headers for authorization
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch the user's profile data using the token
      fetchProfileData();
    } else {
      // No valid token found, redirect to the login page
      history.push('/login');
    }
  }, [history]);

  const fetchProfileData = () => {
    axiosInstance.get('/profile')
      .then(response => {
        console.log("Profile Data Response:", response); // Debugging
        setProfileData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <DashboardNav />
      <Container maxWidth={isLargeScreen ? "md" : "sm"} sx={{ mt: 4 }} style={{ marginTop: "90px" }}>
        {isLoading ? (
          // Show loading indicator while data is being fetched
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <CircularProgress color="primary" />
          </Box>
        ) : profileData ? (
          // Show profile data once it's available
          <>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button variant="outlined" onClick={handleOpenModal}>
                Edit Profile
              </Button>
            </Box>

            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
                      <Avataaars
                        avatarStyle="Circle"
                        topType={profileData.topType}
                        accessoriesType={profileData.accessoriesType}
                        hairColor={profileData.hairColor}
                        facialHairType={profileData.facialHairType}
                        clotheType={profileData.clotheType}
                        clotheColor={profileData.clotheColor}
                        eyeType={profileData.eyeType}
                        eyebrowType={profileData.eyebrowType}
                        mouthType={profileData.mouthType}
                        skinColor={profileData.skinColor}
                        width={120}
                        height={120}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6} style={{ marginTop: '7%' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      Personal Details
                    </Typography>
                    <Typography variant="body1">
                      <strong>Username:</strong> {profileData.username}
                    </Typography>
                    <Typography variant="body1">
                      <strong>User ID:</strong> {profileData.id}
                    </Typography>
                    <Typography variant="body1">
                      <strong>First Name:</strong> {profileData.first_name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Last Name:</strong> {profileData.last_name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Email:</strong> {profileData.email}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Address:</strong> {profileData.address}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Mobile No:</strong> {profileData.mobile_no}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Metamask Wallet Address:</strong> {profileData.metamask_address}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Modal open={isModalOpen} onClose={handleCloseModal}>
              <UpdateModal
                profileData={profileData}
                handleCloseModal={handleCloseModal}
                setProfileData={setProfileData}
              />
            </Modal>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                      Bank Details
                    </Typography>
                    <Typography variant="body1">
                      <strong>Bank Name:</strong> {profileData.bank_name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Branch:</strong> {profileData.branch}
                    </Typography>
                    <Typography variant="body1">
                      <strong>IFSC Code:</strong> {profileData.ifsc_code}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Account Number:</strong> {profileData.account_number}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Bank Balance:</strong> {profileData.bank_balance}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                      KYC
                    </Typography>
                    <Typography variant="body1">
                      <strong>PAN Number:</strong> {profileData.pan_number}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        ) : (
          // Show a message when profile data is not available
          <Typography variant="h6" align="center" gutterBottom>
            Profile data not found.
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default ProfilePage;
