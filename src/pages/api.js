// api.js
const API_BASE_URL = 'http://localhost:5000'; // Update with your production URL

const api = {
  registerUser: (userData) => {
    return fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }).then((response) => response.json());
  },

  login: (userData) => {
    return fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }).then((response) => response.json());
  },

  getProfileData: () => {
    return fetch(`${API_BASE_URL}/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the user's token
      },
      credentials: 'include', // Include credentials (e.g., cookies)
    }).then((response) => response.json());
  },

  updateProfileData: (userData) => {
    return fetch(`${API_BASE_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the user's token
      },
      body: JSON.stringify(userData),
      credentials: 'include', // Include credentials (e.g., cookies)
    }).then((response) => response.json());
  },

  uploadInvoice: (formData) => {
    return fetch(`${API_BASE_URL}/upload_invoice`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the user's token
      },
      body: formData,
    }).then((response) => response.json());
  },

  submitInvoice: (invoiceData) => {
    return fetch(`${API_BASE_URL}/submit_invoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the user's token
      },
      body: JSON.stringify(invoiceData),
    }).then((response) => response.json());
  },

  approvedInvoices: () => {
    return fetch(`${API_BASE_URL}/approved_invoices`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the user's token
      },
    }).then((response) => response.json());
  },

  pendingApprovalInvoices: () => {
    return fetch(`${API_BASE_URL}/pending_approval_invoices`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the user's token
      },
    }).then((response) => response.json());
  },

  deleteInvoice: (invoiceId) => {
    return fetch(`${API_BASE_URL}/invoices/${invoiceId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the user's token
      },
    }).then((response) => response.json());
  },

  sendForApproval: (invoiceId) => {
    return fetch(`${API_BASE_URL}/invoices/pending_approval_pdfs/${invoiceId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the user's token
      },
    }).then((response) => response.json());
  },

  cameForApproval: () => {
    return fetch(`${API_BASE_URL}/came_for_approval`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the user's token
      },
    }).then((response) => response.json());
  },

  approveInvoice: (invoiceId) => {
    return fetch(`${API_BASE_URL}/approve_invoice/${invoiceId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the user's token
      },
    }).then((response) => response.json());
  },

  tokens: () => {
    return fetch(`${API_BASE_URL}/tokens`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the user's token
      },
    }).then((response) => response.json());
  },

  fetchInvoiceData: (invoiceId) => {
    return fetch(`${API_BASE_URL}/fetch_invoice_data?invoice_id=${invoiceId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the user's token
      },
    }).then((response) => response.json());
  },

  validateMintTokens: (data) => {
    return fetch(`${API_BASE_URL}/validate_mint_tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the user's token
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  },

  redeemTokens: (data) => {
    return fetch(`${API_BASE_URL}/redeem_tokens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Set the user's token
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  },

  // Add more API calls for other endpoints as needed
};

export default api;
