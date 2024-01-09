import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Container } from '@mui/material';
import Home from './pages/Home';
import HomeInvoice from './pages/home-invoice';
import Navbar from './components/Navbar';
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/dashboard/Dashboard';
import Footer from './components/Footer';
import Invoice from './pages/dashboard/invoice/Invoice';
import ProfilePage from './pages/dashboard/Profilepage';
import InvoicesForApproval from './pages/dashboard/invoice/InvoicesForApproval';
import ApprovedPDFs from './pages/dashboard/invoice/ApprovedPDFs';
import PendingApprovalPDFs from './pages/dashboard/invoice/PendingApproval';
import EarlyPayment from './pages/dashboard/EarlyPayment';
import Settings from './pages/dashboard/Settings';
import Tokens from './pages/dashboard/Tokens'; // Import the Tokens component
import Support from './pages/dashboard/Support';
import AdminDashboard from './pages/dashboard-admin/admin_dashboard';
import AddUser from './pages/dashboard-admin/add_user';
import TotalUsers from './pages/dashboard-admin/Total_Users';
import TotalInvoices from './pages/dashboard-admin/Total_Invoices';
import SellerDashboard from './pages/dashboard-seller/seller_Dashboard';
import SellerApprovedPDFs from './pages/dashboard-seller/invoice/seller_ApprovedPDFs'
import SellerInvoice from './pages/dashboard-seller/invoice/seller_Invoice'
import SellerInvoicesForApproval from './pages/dashboard-seller/invoice/seller_InvoicesForApproval'
import SellerPendingApprovalPDFs from './pages/dashboard-seller/invoice/seller_PendingApproval'
import seller_EarlyPayments from './pages/dashboard-seller/seller_EarlyPayment'
import SellerProfilePage from './pages/dashboard-seller/seller_Profilepage';
import SellerSupport from './pages/dashboard-seller/seller_Support';
import SellerTokens from './pages/dashboard-seller/seller_Tokens';
import BuyerDashboard from './pages/dashboard-buyer/buyer_dashboard';
import BuyerLenderApproval from './pages/dashboard-buyer/buyer_LenderApproval';
import BuyerStatus from './pages/dashboard-buyer/buyer_Status';
import BuyerReminderPage from './pages/dashboard-buyer/buyer_ReminderPage';
import BuyerInvoiceForApproval from './pages/dashboard-buyer/buyer_InvoiceForApproval';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const handleLogin = () => {
    setIsLoggedIn(true);
    history.push('/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    history.push('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isLoggedIn ? null : <Navbar />}
      <Container
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={RegistrationForm} />
          <Route exact path="/login">
            <LoginForm handleLogin={handleLogin} />
          </Route>
          {isLoggedIn && (
            <Route exact path="/dashboard">
              <Dashboard handleLogout={handleLogout} isLoggedIn={isLoggedIn} />
            </Route>
          )}


          //admin-dashboard 
          <Route exact path="/admin-dashboard" component={AdminDashboard} />
          <Route exact path="/admin-dashboard/add_user" component={AddUser} />
          <Route exact path="/admin-dashboard/total-users" component={TotalUsers} />
          <Route exact path="/admin-dashboard/total-invoices" component={TotalInvoices} />


          //seller-dashboard
          <Route exact path="/seller-dashboard" component={SellerDashboard} />
          <Route exact path="/seller-earlypayment" component={seller_EarlyPayments} />
          <Route exact path="/seller-profilepage" component={SellerProfilePage} />
          <Route exact path="/seller-settings" component={SellerDashboard} />
          <Route exact path="/seller-tokens" component={SellerTokens} />
          <Route exact path="/seller-support" component={SellerSupport} />
          <Route exact path="/seller-ApprovedPDFs" component={SellerApprovedPDFs} />
          <Route exact path="/seller-invoice" component={SellerInvoice} />
          <Route exact path="/seller-InvoicesForApproval" component={SellerInvoicesForApproval} />
          <Route exact path="/seller-pendingapproval" component={SellerPendingApprovalPDFs} />
          


          //buyer-dashboard
          <Route exact path="/buyer-dashboard" component={BuyerDashboard} />
          <Route exact path="/buyer-dashboard/invoice-for-approval" component={BuyerInvoiceForApproval} />
          <Route exact path="/buyer-dashboard/status" component={BuyerStatus} />
          <Route exact path="/buyer-dashboard/lender-invoice" component={BuyerLenderApproval} />
          <Route exact path="/buyer-dashboard/reminder-page" component={BuyerReminderPage} />



          <Route exact path="/home-invoice" component={HomeInvoice} />
          <Route exact path="/dashboard/profile">
            <ProfilePage isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/invoices">
            <Invoice isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/invoices/invoiceforapproval">
            <InvoicesForApproval isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/invoices/approved_invoices">
            <ApprovedPDFs isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/invoices/pending_approval_pdfs">
            <PendingApprovalPDFs isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/earlypayment">
            <EarlyPayment isLoggedIn={isLoggedIn} />
          </Route>
          {/* Include the Tokens route */}
          <Route exact path="/dashboard/tokens">
            <Tokens isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/support">
            <Support isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/settings">
            <Settings isLoggedIn={isLoggedIn} />
          </Route>
        </Switch>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
