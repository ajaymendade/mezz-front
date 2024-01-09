import React, { useState, useEffect } from 'react';
import { useMediaQuery, Container, IconButton, Grid, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Typography, Button } from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';
import axiosInstance from '../../axios.js'; // Import your Axios instance
import SellerDashboardNav from '../seller_DashboardNav.js';

const SellerPendingApprovalPDFs = ({ isLoggedIn }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [invoicesData, setInvoicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if a valid JWT token exists in local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Set the token in Axios instance headers for authorization
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch the pending approval PDFs data using the token
      axiosInstance.get('/pending_approval_invoices')
        .then(response => {
          setInvoicesData(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching pending approval PDFs data:', error);
          setIsLoading(false);
        });
    } else {
      // No valid token found, handle authentication error
      console.error('No valid JWT token found.');
      // You can show an error message or redirect to the login page here.
    }
  }, []);

  const handleDeleteInvoice = (invoiceId) => {
    axiosInstance.delete(`/invoices/${invoiceId}`)
      .then((response) => {
        setInvoicesData((prevInvoices) =>
          prevInvoices.filter((invoice) => invoice.id !== invoiceId)
        );
        alert(`Invoice with ID ${invoiceId} has been deleted.`);
      })
      .catch((error) => {
        console.error(`Error deleting invoice with ID ${invoiceId}:`, error);
        alert(`Error deleting invoice with ID ${invoiceId}. Please try again later.`);
      });
  };

  const handleSendForApproval = (invoiceId) => {
    axiosInstance.post(`/invoices/pending_approval_pdfs/${invoiceId}`)
      .then(response => {
      })
      .catch(error => {
        console.error('Error while sending for approval:', error);
      });
  };

  return (
    <div>
      <SellerDashboardNav isLoggedIn={isLoggedIn} />
      <Container style={{ marginTop: "90px", marginBottom: '20px' }}>
        <h2>PDF's Pending For Approval </h2><p style={{ marginTop: '0px' }}>Send for Approval from Here</p>
        {isSmallScreen ? (
          <Grid container spacing={3} justifyContent="center" style={{ marginTop: '8px' }}>
            {invoicesData.map((invoice) => (
              <Grid item key={invoice.id} xs={12} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                  <Typography variant="h6" gutterBottom>
                    Invoice ID: {invoice.invoice_id}
                  </Typography>
                  <Typography variant="body2">Total Amount: {invoice.total_amount}</Typography>
                  <Typography variant="body2">Due Date: {invoice.due_date}</Typography>
                  <Typography variant="body2">Buyer ID: {invoice.buyer_id}</Typography>
                  <Typography variant="body2">Buyer Metamask Address: {invoice.buyer_metamask_address}</Typography>
                  <Typography variant="body2">Approval Status: {invoice.approval_status}</Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    <IconButton onClick={() => alert(`View Invoice ID: ${invoice.invoice_id}`)}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteInvoice(invoice.id)}>
                      <Delete />
                    </IconButton>
                    <Button variant="contained"  color="secondary" style={{fontSize:'12px'}} onClick={()=>handleSendForApproval(invoice.id)}>
                      Send for approval
                    </Button>
                  </div>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <TableContainer component={Paper} style={{ width: '100%', marginTop: '25px' }}>
  <Table>
    <TableHead>
      <TableRow >
        <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }} >Invoice ID</TableCell>
        <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Total Amount</TableCell>
        <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Due Date</TableCell>
        <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Buyer ID</TableCell>
        <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Buyer Metamask Address</TableCell>
        <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Approval Status</TableCell>
        <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {invoicesData.map((invoice) => (
        <TableRow key={invoice.id} >
          <TableCell>{invoice.invoice_id}</TableCell>
          <TableCell>{invoice.total_amount}</TableCell>
          <TableCell>{invoice.due_date}</TableCell>
          <TableCell>{invoice.buyer_id}</TableCell>
          <TableCell>{invoice.buyer_metamask_address}</TableCell>
          <TableCell>{invoice.approval_status}</TableCell>
          <TableCell>
            <IconButton onClick={() => alert(`View Invoice ID: ${invoice.invoice_id}`)}>
              <Visibility />
            </IconButton>
            <IconButton onClick={() => handleDeleteInvoice(invoice.id)}>
              <Delete />
            </IconButton>
            <Button variant="contained" color="secondary" onClick={() => handleSendForApproval(invoice.id)}>
              Send for approval
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
        )}
      </Container>
    </div>
  );
};

export default SellerPendingApprovalPDFs;
