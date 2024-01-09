import React, { useState } from 'react';
import {
  Button,
  Modal,
  Typography,
  Box,
  Grid,
  IconButton,
  useMediaQuery,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../../pages/axios.js';

const InvoiceModal = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [editedData, setEditedData] = useState({});
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [buyerId, setBuyerId] = useState('');
  const [buyerMetamaskAddress, setBuyerMetamaskAddress] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert('Please select a PDF file.');
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('invoice_file', selectedFile);

      // Check if a valid JWT token exists in local storage
      const token = localStorage.getItem('token');

      if (token) {
        // Set the token in Axios instance headers for authorization
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Use the Axios instance to make the POST request to upload the invoice
        axiosInstance
          .post('/upload_invoice', formData)
          .then((response) => {
            console.log('Response from the backend:', response.data);
            setExtractedData(response.data.invoice_fields);
            setPdfUrl(response.data.pdf_url);
            setEditedData(response.data.invoice_fields);
          })
          .catch((error) => {
            console.error('Error from the backend:', error);
            alert('Failed to extract data from the PDF. Please try again.');
          });
      } else {
        // No valid token found, handle authentication error
        console.error('No valid JWT token found.');
        // You can show an error message or redirect to the login page here.
      }
    }
  };

  const handleSave = () => {
    const dataToSend = {
      ...editedData,
      pdf_url: pdfUrl,
      buyer_id: buyerId,
      buyer_metamask_address: buyerMetamaskAddress,
    };

    // Check if a valid JWT token exists in local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Set the token in Axios instance headers for authorization
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Use the Axios instance to make the POST request to submit the invoice
      axiosInstance
        .post('/submit_invoice', dataToSend)
        .then((response) => {
          console.log('Data submitted successfully:', response.data);
          onClose();
        })
        .catch((error) => {
          console.error('Error submitting data:', error);
          alert('Failed to submit data. Please try again.');
        });
    } else {
      // No valid token found, handle authentication error
      console.error('No valid JWT token found.');
      // You can show an error message or redirect to the login page here.
    }
  };

  const handleDueDateChange = (e) => {
    const inputDate = e.target.value;
    if (/^[0-9-]*$/.test(inputDate)) {
      if (inputDate.length <= 10) {
        if (/^\d{2}$/.test(inputDate) || /^\d{2}-\d{2}$/.test(inputDate)) {
          const formattedDate = inputDate.replace(/-/g, '');
          let dateWithDashes = formattedDate;
          if (formattedDate.length >= 4) {
            dateWithDashes = formattedDate.slice(0, 2) + '-' + formattedDate.slice(2, 4);
          }
          if (formattedDate.length >= 6) {
            dateWithDashes += '-' + formattedDate.slice(4, 8);
          }
          setEditedData({ ...editedData, due_date: dateWithDashes });
        } else {
          setEditedData({ ...editedData, due_date: inputDate });
        }
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '32px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          minWidth: isSmallScreen ? '80vw' : '400px',
          maxWidth: '100%',
          boxShadow: 24,
        }}
      >
        <IconButton
          sx={{ position: 'absolute', top: '8px', right: '8px' }}
          color="primary"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          Upload Invoice
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <label htmlFor="file-input">
              <Button variant="outlined" color="primary" component="span">
                Choose File
              </Button>
              <input
                id="file-input"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
            {selectedFile && (
              <Typography variant="body2" color="text.secondary">
                Selected File: {selectedFile.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!selectedFile}>
              Submit
            </Button>
            <Button variant="outlined" color="primary" onClick={onClose} style={{ marginLeft: '8px' }}>
              Cancel
            </Button>
          </Grid>
        </Grid>

        {pdfUrl && extractedData && (
          <Box mt={2}>
            <Typography variant="subtitle1">PDF URL:</Typography>
            <Typography variant="body1" color="text.secondary">
              {pdfUrl}
            </Typography>
            <Typography variant="subtitle1" mt={2}>
              Extracted Data:
            </Typography>
            {/* Render extracted data in input boxes */}
            <TextField
              label="Invoice ID"
              variant="outlined"
              margin="normal"
              value={editedData.invoice_id || ''}
              onChange={(e) => setEditedData({ ...editedData, invoice_id: e.target.value })}
              fullWidth
            />
            {/* Other fields... */}
            <TextField
              label="Total Amount"
              variant="outlined"
              margin="normal"
              value={editedData.total_amount || ''}
              onChange={(e) => setEditedData({ ...editedData, total_amount: e.target.value })}
              fullWidth
            />
            <TextField
  label="Due Date"
  variant="outlined"
  margin="normal"
  value={editedData.due_date || ''}
  onChange={handleDueDateChange}
  fullWidth
  InputProps={{
    inputProps: {
      type: 'text',
      pattern: '^[0-9-]*$',
    },
    placeholder: 'dd-mm-yyyy', // Change placeholder to 'dd-mm-yyyy'
  }}
/>


            <h4>Buyer Details</h4>
            <TextField
              label="Buyer ID"
              variant="outlined"
              margin="normal"
              value={buyerId}
              onChange={(e) => setBuyerId(e.target.value)}
              fullWidth
            />
            <TextField
            label="Buyer Metamask Address"
            variant="outlined"
            margin="normal"
            value={buyerMetamaskAddress}
            onChange={(e) => setBuyerMetamaskAddress(e.target.value)}
            fullWidth
           />

            <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '16px' }}>
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default InvoiceModal;