import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PaymentPage() {
  const location = useLocation();
  const cart = location.state?.cart || [];
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [inputValue, setInputValue] = useState('');
  const [processing, setProcessing] = useState(false);
  const [canCancel, setCanCancel] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);


  const orderTime = localStorage.getItem('orderTime'); // Get the order time from localStorage

  // Calculate whether the order can be canceled (within 1 minute)
  useEffect(() => {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - orderTime;

    if (timeDifference < 60000) { // 1 minute = 60000 ms
      setCanCancel(true);
    }
  }, [orderTime]);

  const isValidUPI = (upi) => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{3,}@[a-zA-Z]{3,}$/;
    return upiRegex.test(upi);
  };

  const isValidCard = (cardNumber) => {
    const cardRegex = /^[0-9]{13,19}$/;
    return cardRegex.test(cardNumber);
  };

  const handlePay = () => {
    if (paymentMethod === 'UPI' && !isValidUPI(inputValue)) {
      alert('Please enter a valid UPI ID.');
      return;
    }
    if (paymentMethod === 'Card' && !isValidCard(inputValue)) {
      alert('Please enter a valid credit card number.');
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      const randomOrderId = Math.floor(Math.random() * 100000);
      const newOrder = {
        id: randomOrderId,
        items: cart,
        total,
        date: new Date().toLocaleString(),
      };

      const prevOrders = JSON.parse(localStorage.getItem('orders')) || [];
      localStorage.setItem('orders', JSON.stringify([...prevOrders, newOrder]));
      localStorage.setItem('latestOrderId', randomOrderId);

      navigate('/order-status', { state: { orderId: randomOrderId } });
    }, 3000); // Simulate 3 seconds of payment processing
  };

  const handleCancelOrder = () => {
    // Clear the order data from localStorage
    localStorage.removeItem('latestOrderId');
    localStorage.removeItem('orderTime');
    navigate('/menu'); // Navigate back to the menu page
  };

  return (
    <div className="container mt-5">
      <h2>Payment</h2>
      <p>Total Amount: <strong>₹{total}</strong></p>

      <div className="form-group mt-3">
        <label>Select Payment Method:</label>
        <select
          className="form-control"
          value={paymentMethod}
          onChange={(e) => {
            setPaymentMethod(e.target.value);
            setInputValue('');
          }}
        >
          <option value="UPI">UPI</option>
          <option value="Card">Credit/Debit Card</option>
          <option value="Cash">Cash</option>
        </select>
      </div>

      {paymentMethod === 'UPI' && (
        <div className="form-group mt-3">
          <label>Enter UPI ID:</label>
          <input
            type="text"
            className="form-control"
            placeholder="example@upi"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      )}

      {paymentMethod === 'Card' && (
        <div className="form-group mt-3">
          <label>Enter Card Number:</label>
          <input
            type="text"
            className="form-control"
            placeholder="1234 5678 9012 3456"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      )}

      {paymentMethod === 'Cash' && (
        <p>Cash payment selected. Please hand over the cash at the time of delivery.</p>
      )}

      <button
        className="btn btn-success mt-4"
        disabled={processing || (paymentMethod !== 'Cash' && inputValue.trim() === '')}
        onClick={handlePay}
      >
        {processing
          ? 'Processing Payment...'
          : paymentMethod === 'Cash'
          ? 'Place Order (Pay on Delivery)'
          : 'Pay Now'}
      </button>

      {canCancel && (
        <button
          className="btn btn-danger mt-4 ms-2"
          onClick={handleCancelOrder}
        >
          Cancel Order
        </button>
      )}
    </div>
  );
}

export default PaymentPage;
