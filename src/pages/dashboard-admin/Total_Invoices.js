import React from 'react';
import AdminDashboardNav from './admin_DashboardNav';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const TotalInvoices = () => {
  // Sample data (replace with actual data from the database)
  const invoicesData = [
    {
      id: 1,
      user_id: 123,
      invoice_id: 'INV123',
      total_amount: 500.0,
      due_date: '2022-12-31', // Replace with actual date
      buyer_id: 456,
      buyer_metamask_address: '0xabcdef123456',
      pdf_url: 'https://example.com/invoice.pdf',
      approval_status: true,
      metamask_address: '0x7890123456',
    },
    // Add more sample data as needed
  ];

  const handleViewPDF = (pdfUrl) => {
    // Implement logic to open or display the PDF
    window.open(pdfUrl, '_blank'); // Open the PDF in a new tab
  };

  return (
    <>
      <AdminDashboardNav />
      <div style={{ marginTop: 10 }}>
        <Typography style={{ fontSize: 25 }}>
          Total Invoices with status approved or not
        </Typography>
      </div>
      <TableContainer component={Paper} style={{ margin: '20px auto', maxWidth: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Buyer ID</TableCell>
              <TableCell>Buyer Metamask Address</TableCell>
              <TableCell>View PDF</TableCell>
              <TableCell>Approval Status</TableCell>
              <TableCell>Metamask Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoicesData.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.user_id}</TableCell>
                <TableCell>{invoice.invoice_id}</TableCell>
                <TableCell>{invoice.total_amount}</TableCell>
                <TableCell>{invoice.due_date}</TableCell>
                <TableCell>{invoice.buyer_id}</TableCell>
                <TableCell>{invoice.buyer_metamask_address}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary">
                    View
                  </Button>
                </TableCell>
                <TableCell>{invoice.approval_status ? 'Approved' : 'Not Approved'}</TableCell>
                <TableCell>{invoice.metamask_address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TotalInvoices;
