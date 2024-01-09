import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import DashboardNav from '../../components/dashboard/DashboardNav';
import Web3 from 'web3';
import axiosInstance from '../axios.js';

const Tokens = () => {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);
  const [connected, setConnected] = useState(false);
  const [invoiceContract, setInvoiceContract] = useState(null);
  const [connectedContract, setConnectedContract] = useState(false); 
  const [sellerAddress, setSellerAddress] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notification, setNotification] = useState(null);
  const [invoiceBalance, setInvoiceBalance] = useState(null); // New state for invoice balance
  const [accessStatus, setAccessStatus] = useState(''); // Add this state variable
  const [invoiceList, setInvoiceList] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

 

  useEffect(() => {
    // Check if a valid JWT token exists in local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Set the token in Axios instance headers for authorization
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch access status using the token
      axiosInstance.get('/tokens')
        .then(response => {
          if ('message' in response.data) {
            setAccessStatus(response.data.message);
          } else if ('error' in response.data) {
            setAccessStatus(response.data.error);
          }
        })
        .catch(error => {
          console.error('Error fetching access status:', error);
        });
    } else {
      // No valid token found, handle authentication error
      console.error('No valid JWT token found.');
      // You can show an error message or redirect to the login page here.
    }
  }, []);

  

  const fetchInvoiceData = async (invoiceId) => {
    try {
      const token = localStorage.getItem('token'); // Get the JWT token from local storage
      const headers = {
        'Authorization': `Bearer ${token}`, // Include the JWT token in the Authorization header
      };
  
      const response = await axiosInstance.get(`/fetch_invoice_data?invoice_id=${invoiceId}`, { headers });
      const data = response.data;
      if (data.id !== undefined) {
        populateFieldsWithInvoiceData(data);
      } else {
        console.log('Invoice not found');
      }
    } catch (error) {
      console.error('Error fetching invoice data:', error);
    }
  };

  const populateFieldsWithInvoiceData = (invoiceData) => {
    setSelectedInvoice(invoiceData);
    if (invoiceData) {
      setSellerAddress(invoiceData.buyer_metamask_address); // Note: Updated field name
      setBuyerAddress(invoiceData.buyer_metamask_address);
      setAmount(invoiceData.total_amount.toString());
      setDueDate(invoiceData.due_date);
      // ... (populate other relevant fields)
    }
  };
  
  const handleFetchInvoice = () => {
    const invoiceId = document.getElementById('invoiceIdInput').value;
    fetchInvoiceData(invoiceId);
  };

  
  const validateMintTokens = async (invoiceAmount, requestedTokens) => {
    try {
      const response = await axiosInstance.post('/validate_mint_tokens', {
        invoice_amount: invoiceAmount,
        requested_tokens: requestedTokens,
      });

      const validationData = response.data;

      if (validationData.valid) {
        // Validation successful, continue with minting
        await mintTokens(); // Call the mintTokens function if validation is successful
      } else {
        // Show validation error message
        showNotification(validationData.message, 'error');
      }
    } catch (error) {
      console.error('Error validating mint tokens:', error);
      showNotification('An error occurred while validating mint tokens', 'error');
    }
  };



  const connectMetamask = async () => {
    if (window.ethereum !== undefined) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        const accounts = await web3Instance.eth.getAccounts();
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setConnected(true); // Update the connected state
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      console.log("MetaMask not available in this browser.");
    }
  };
  
  const connectInvoiceContract = async () => {
    if (web3) {
      try {
        // Replace with the actual contract address
        const contractAddress = '0x4D07Fe3b959E787e6cC61Ea1d4f210614583dF3a';
        const abi = [
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "Approval",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
              }
            ],
            "name": "ApprovalForAll",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "_fromTokenId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "_toTokenId",
                "type": "uint256"
              }
            ],
            "name": "BatchMetadataUpdate",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
              }
            ],
            "name": "MetadataUpdate",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "_redeemer",
                "type": "address"
              }
            ],
            "name": "redeemTokensOnDueDate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "operator",
                "type": "address"
              },
              {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
              }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_seller",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "_buyer",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "_dueDate",
                "type": "uint256"
              }
            ],
            "name": "tokenizeInvoice",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "balanceOf",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "getApproved",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "_address",
                "type": "address"
              }
            ],
            "name": "getTokenBalanceCount",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "operator",
                "type": "address"
              }
            ],
            "name": "isApprovedForAll",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "ownerOf",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
              }
            ],
            "name": "supportsInterface",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "symbol",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "tokenDueDates",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
              }
            ],
            "name": "tokenURI",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ]; // Contract ABI

        const contractInstance = new web3.eth.Contract(abi, contractAddress);
        setInvoiceContract(contractInstance);
        setConnectedContract(true); // Update the contract connection status
      } catch (error) {
        console.error("Error connecting to contract:", error);
      }
    } else {
      console.log("Please connect to MetaMask first.");
    }
  };

  const mintTokens = async () => {
    const dueDateTimestamp = new Date(dueDate).getTime() / 1000;

    try {
      // Send a POST request to the /validate_mint_tokens endpoint
      const validationResponse = await axiosInstance.post('/validate_mint_tokens', {
        invoice_amount: amount, // Replace with the correct field name
        requested_tokens: amount, // You can use the same amount for tokens requested
      });
  
      const validationData = validationResponse.data; 

        if (validationData.valid) {
            await invoiceContract.methods.tokenizeInvoice(sellerAddress, buyerAddress, amount, dueDateTimestamp).send({ from: account });
            showNotification('Invoice tokens minted successfully!', 'success');
        } else {
            showNotification(validationData.message, 'error');
        }
    } catch (error) {
        showNotification('An error occurred while minting invoice tokens. Please try again.', 'error');
    }
};


  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const getBalanceInvoice = async () => {
    try {
      const address = document.getElementById('addressInput').value;
      const data = await invoiceContract.methods.getTokenBalanceCount(address).call();
      setInvoiceBalance(data); // Assuming you have a state variable to store the balance
    } catch (error) {
      console.error('Error fetching invoice token balance:', error);
    }
  };

  const redeemTokens = async () => {
    try {
      const tokenToRedeem = document.getElementById('redeemTokenIdInput').value;
      await invoiceContract.methods.redeemTokensOnDueDate(tokenToRedeem, account).send({ from: account });
      showRedeemResult('Tokens redeemed successfully!', 'success');
    } catch (error) {
      showRedeemResult('Failed to redeem tokens. Please try again.', 'error');
    }
  };

  const showRedeemResult = (message, type) => {
    const redeemResult = document.getElementById("redeemResultArea");
    redeemResult.innerText = message;
    redeemResult.className = type === "success" ? "success" : "error";
  
    setTimeout(() => {
      redeemResult.innerText = "";
      redeemResult.className = "";
    }, 5000);
  };

  return (
    <div>
      <DashboardNav />
      <Container maxWidth="md" sx={{ mt: 4 }} style={{ marginTop: '63px' }}>
        {/* Content for the Tokens page */}
        <Typography variant="h2">Tokens Page</Typography>

        <div className="section" id="metamaskSection">
  <Button variant="contained" color="primary" onClick={connectMetamask}>
    CONNECT TO METAMASK
  </Button>
  <p id="userArea">Status: {connected ? 'Connected to Metamask' : 'Not connected to Metamask'}</p>
</div>


<div className="section" id="contractSection">
  <Button variant="contained" color="primary" onClick={connectInvoiceContract}>
    CONNECT TO INVOICE CONTRACT
  </Button>
  <p id="invoiceContractArea">
    Status: {connectedContract ? 'Connected to Invoice Contract' : 'Not connected to Invoice Contract'}
  </p>
</div>

{accessStatus === "You can access the tokens page now." ? (
<div>

<div className="section">
            <h2>Fetch Invoice Data</h2>
            <p>Enter the invoice ID to populate the fields:</p>
            <TextField
              label="Invoice ID"
              variant="outlined"
              fullWidth
              id="invoiceIdInput"
            />
            <Button variant="contained" color="primary" onClick={handleFetchInvoice}>
              FETCH INVOICE DATA
            </Button>
          </div>


<div className="section">
          <h2>Convert Amount into Tokens</h2>
          <p>Fill in the below invoice details to convert the amount into tokens:</p>
          <TextField
            label="Seller Address"
            variant="outlined"
            fullWidth
            value={sellerAddress}
            onChange={(e) => setSellerAddress(e.target.value)}
          />
          <TextField
            label="Buyer Address"
            variant="outlined"
            fullWidth
            value={buyerAddress}
            onChange={(e) => setBuyerAddress(e.target.value)}
          />
          <TextField
            label="Amount"
            type="number"
            variant="outlined"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}

          />
          <TextField
             label="Due Date"
            type="date"
            variant="outlined"
            fullWidth
            value={dueDate}
            disabled // Disable the input to prevent changes
          />

          <Button     
          variant="contained"
          color="primary"
          onClick={mintTokens}
          >
          MINT INVOICE TOKENS
          </Button>
          <div className={notification && notification.type}>
            {notification && (
              <div className="notification-message">{notification.message}</div>
            )}
          </div>
        </div>

        <div className="section">
          <h2>Fetch Invoice Token Balance</h2>
          <p>Enter an address below to fetch the invoice token balance:</p>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            id="addressInput"
          />
          <p id="invoiceBalanceArea">Invoice Token Balance: {invoiceBalance !== null ? invoiceBalance : 'Not Connected to Contract'}</p>
          <Button variant="contained" color="primary" onClick={getBalanceInvoice}>
            GET INVOICE TOKEN BALANCE
          </Button>
        </div>

        <div className="section">
          <h2>Redeem Tokens Below</h2>
          <p>Enter the token ID</p>
          <TextField
            label="Token ID"
            variant="outlined"
            fullWidth
            id="redeemTokenIdInput"
          />
          <p id="redeemResultArea">{/* Redeem result message will be displayed here */}</p>
          <Button variant="contained" color="primary" onClick={redeemTokens}>
            REDEEM TOKENS
          </Button>
        </div>
        </div>
      ) : (
        <div className="section">
          <p>{accessStatus}</p>
        </div>
      )}


      </Container>
    </div>
  );
};

export default Tokens;
