import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import OrderStatusPage from './OrderStatusPage';
import OrderHistoryPage from './OrderHistoryPage';
import PaymentPage from './PaymentPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import PrivateRoute from './PrivateRoute';
import { CartProvider } from './CartContext'; // Import CartProvider

function App() {
  const [user, setUser] = useState(null); // State to manage the logged-in user

  // Check for the user on initial load
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser); // Set user if already logged in
    }
  }, []);

  return (
    <CartProvider> {/* Wrap the entire app with CartProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout user={user} setUser={setUser} />}> {/* Pass user and setUser as props */}
            <Route index element={<HomePage />} />
            <Route path="/menu" element={
              <PrivateRoute>
                <MenuPage />
              </PrivateRoute>
            } />
            <Route path="/cart" element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            } />
            <Route path="/checkout" element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            } />
            <Route path="/order-status" element={<OrderStatusPage />} />
            <Route path="/history" element={
              <PrivateRoute>
                <OrderHistoryPage />
              </PrivateRoute>
            } />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/signup" element={<SignupPage setUser={setUser} />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider> 
  );
}

export default App;
