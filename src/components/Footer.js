import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f0f0f0', padding: '20px 0' }}>
      <Container>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="body2" align="center">
              © {new Date().getFullYear()} Mezzpro. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="body2" align="center">
              <Link to="/contact" style={{ marginRight: 10 }}>
                Contact Us
              </Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
