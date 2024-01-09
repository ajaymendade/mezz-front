import React, { useState } from 'react';
import { useMediaQuery, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import DashboardNav from '../../../components/dashboard/DashboardNav';
import InvoiceModal from '../../../components/dashboard/invoice/InvoiceModal';

const Invoice = ({ isLoggedIn }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };



  return (
    <>
      <DashboardNav isLoggedIn={isLoggedIn} />
      <div style={{ marginTop: '89px', padding: '16px', height: '100%', position: 'relative' }}>
        {isSmallScreen && (
          <IconButton
            color="primary"
            aria-label="menu"
            onClick={handleMenuOpen}
            style={{
              position: 'absolute',
              top: '0',
              right: '16px',
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {!isSmallScreen && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
            style={{
              position: 'absolute',
              top: '0',
              right: '56px',
            }}
          >
            Upload Invoice
          </Button>
        )}

        {isSmallScreen && (
          <Menu
            anchorEl={menuAnchor}
            keepMounted
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            style={{ marginTop: '0px' }}
          >
            <MenuItem onClick={handleOpenModal}>Upload Invoice</MenuItem>
          </Menu>
        )}


        <div style={{marginTop:'30px'}}>
          <p>- Step 1: Just click a button to upload your invoice in PDF format. It's as simple as attaching a file to an email! 📎💻</p>
          <p>- Step 2: Our smart system will read the important details from your invoice automatically. No need to type anything! It's like magic! 🔮🧙‍♂️</p>
          <p>- Step 3: Review the extracted details, and if everything looks good, click "Confirm" to move forward. Easy-peasy! 🌟✨</p>
          
          
          
        </div>
      </div>

      <InvoiceModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Invoice;