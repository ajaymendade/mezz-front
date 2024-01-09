import React, { useState } from 'react';
import { Typography, Button, TextField } from '@mui/material';
import axiosInstance from './axios.js';

const HomeInvoice = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [buyerId, setBuyerId] = useState('');
  const [buyerMetamaskAddress, setBuyerMetamaskAddress] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);

      const formData = new FormData();
      formData.append('invoice_file', file);

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
      setSelectedFile(null);
      alert('Please select a PDF file.');
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

  const handleSave = () => {
    const dataToSend = {
      ...editedData,
      pdf_url: pdfUrl,
      buyer_id: buyerId,
      buyer_metamask_address: buyerMetamaskAddress,
    };

    axiosInstance
      .post('/submit_invoice', dataToSend)
      .then((response) => {
        console.log('Data submitted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
        alert('Failed to submit data. Please try again.');
      });
  };

  return (
    <>
        <div style={{ margin: 15, textAlign: 'center' }}>
        <Typography variant="h4">Invoice Testing Page</Typography>
        </div>

      <div>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
        {selectedFile && (
          <Typography variant="body2" color="text.secondary">
            Selected File: {selectedFile.name}
          </Typography>
        )}

        {pdfUrl && extractedData && (
          <div>
            <Typography variant="subtitle1">PDF URL:</Typography>
            <Typography variant="body1" color="text.secondary">
              {pdfUrl}
            </Typography>
            <Typography variant="subtitle1">Extracted Data:</Typography>
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
                placeholder: 'dd-mm-yyyy',
              }}
            />

            <Typography variant="h4">Buyer Details</Typography>
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
          </div>
        )}
      </div>
    </>
  );
};

export default HomeInvoice;
