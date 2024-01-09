import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Button } from '@mui/material';
import TransferImage from '../images/transfer.png'; 
const Home = () => {
  return (
    <Container style={{ paddingTop: 40, paddingBottom: 40 }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ textAlign: 'center', marginTop: 50, marginBottom: 40 }}>
        <Grid item xs={12} md={6} style={{ textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom style={{ fontWeight: "bold" }}>
            Mezzpro
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            B2B Payments Tokenized
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            style={{ width: '80%', marginBottom: 20 }}
          >
            Register
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            color="primary"
            fullWidth
            size="large"
            style={{ width: '80%' }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/home-invoice"
            variant="outlined"
            color="secondary"
            fullWidth
            size="large"
            style={{ width: '80%', marginTop:20 }}
          >
            Invoice Testing Page
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{ textAlign: 'center' }}>
            <img
              src={TransferImage}
              alt="Mezzpro"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </Grid>
      </Grid>

      <div style={{ marginTop: 150, marginBottom: 40 }}>
        <Typography variant="h4" align="center" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" align="justify">
          Mezzpro is an innovative NFT-based early payment invoice settlement system designed to revolutionize B2B payments for MSMEs (Micro, Small, and Medium Enterprises) in India. Our platform is poised to tackle the significant working capital challenges faced by smaller suppliers within complex supply chains.
        </Typography>

        <Typography variant="h5" gutterBottom style={{ marginTop: 30 }}>
          The Business Challenge:
        </Typography>
        <Typography variant="body1" align="justify">
          In the B2B trade landscape, goods are often sold on credit with payment terms ranging from 30 to 90 days. Such lengthy credit periods put tremendous strain on the working capital needs of MSMEs, especially those operating at lower tiers within the supply chain. In industries like the automotive sector, where more than 75% of component manufacturers are MSMEs, these challenges become even more pronounced.
        </Typography>

        <Typography variant="h5" gutterBottom style={{ marginTop: 30 }}>
          The Mezzpro Solution:
        </Typography>
        <Typography variant="body1" align="justify">
          Mezzpro introduces an ingenious approach to address these working capital constraints by leveraging Non-Fungible Tokens (NFTs) to tokenize invoices. By doing so, we unlock the creditworthiness of higher-tier buyers to support the working capital requirements of lower-tier suppliers. This way, the well-established buyers can provide a lifeline to smaller entities, creating a win-win situation for all stakeholders involved.
        </Typography>

        <Typography variant="h5" gutterBottom style={{ marginTop: 30 }}>
          How Mezzpro Works:
        </Typography>
        <Typography variant="body1" align="justify">
          Tokenizing invoices on our platform is a straightforward process. Here's a simplified breakdown of how it works:
        </Typography>
        <ol>
          <li>
            Suppliers at any level can submit their invoices on Mezzpro for tokenization.
          </li>
          <li>
            The buyer's creditworthiness is already approved by the bank, ensuring a reliable transaction.
          </li>
          <li>
            Once the buyer approves the invoice, Mezzpro creates NFTs where 1 token equals 1 INR (Indian Rupee).
          </li>
          <li>
            These tokens remain valid for the duration of the invoice's payment terms (e.g., 60 days).
          </li>
          <li>
            Suppliers can transfer these tokens to their own suppliers, creating a chain of token transfers down the supply chain.
          </li>
          <li>
            On the payment due date (e.g., 60th day), the buyer pays the invoice amount into an escrow account with the bank.
          </li>
          <li>
            The tokens associated with that invoice are automatically redeemed, and the corresponding amount is transferred to the receiving entity's bank account.
          </li>
        </ol>

        <Typography variant="h5" gutterBottom style={{ marginTop: 30 }}>
          The Advantages of Mezzpro:
        </Typography>
        <Typography variant="body1" align="justify">
          Mezzpro's blockchain-based system ensures a transparent, non-corruptible record of all token transactions. Through this unique platform, lower-tier suppliers gain access to much-needed working capital without collateral or affecting their balance sheets. Buyers, in turn, benefit from strengthened supply chains and the opportunity to help foster growth within their ecosystem. The bank's involvement adds an additional layer of credibility and security to the entire process.
        </Typography>

        <Typography variant="h5" gutterBottom style={{ marginTop: 30 }}>
          Join Us in Transforming B2B Payments:
        </Typography>
        <Typography variant="body1" align="justify">
          At Mezzpro, we are passionate about fostering financial inclusivity and efficiency in the B2B space. By leveraging the power of NFTs and blockchain technology, we are redefining how MSMEs manage their working capital. Join us on this transformative journey to reshape B2B payments in India and beyond.
        </Typography>
      </div>
    </Container>
  );
};

export default Home;
