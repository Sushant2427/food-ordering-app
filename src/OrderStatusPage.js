import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const statuses = ['Order Received', 'Preparing', 'Ready for Pickup', 'Delivered'];
const icons = ['bi-bag-check', 'bi-gear-fill', 'bi-truck', 'bi-house-door-fill'];

function OrderStatusPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [statusIndex, setStatusIndex] = useState(0);
  const [canCancel, setCanCancel] = useState(true);
  const [cancelMessage, setCancelMessage] = useState('');
  
  const orderId = location.state?.orderId || localStorage.getItem('latestOrderId') || 'N/A';

  // Auto update order status
  useEffect(() => {
    const timers = [
      setTimeout(() => setStatusIndex(1), 10000),      // To "Preparing" after 10s
      setTimeout(() => setStatusIndex(2), 40000),      // To "Out for Delivery" after 40s
      setTimeout(() => setStatusIndex(3), 100000),     // To "Delivered" after 1min 40s
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  // Disable cancel once status moves past "Order Received"
  useEffect(() => {
    if (statusIndex >= 1) {
      setCanCancel(false);
      if (statusIndex === 1) {
        setCancelMessage('Your order has started preparing. No refund will be provided.');
      }
    } else {
      setCancelMessage('');
    }
  }, [statusIndex]);

  const handleCancelOrder = () => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = orders.filter(order => order.id !== Number(orderId));
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    localStorage.removeItem('latestOrderId');
    localStorage.removeItem('orderTime');

    navigate('/menu');
  };

  const progressPercent = ((statusIndex + 1) / statuses.length) * 100;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">Order Status</h2>
      <p className="text-center"><strong>Order ID:</strong> #{orderId}</p>

      <div className="progress mb-4" style={{ height: '30px' }}>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated bg-success"
          style={{ width: `${progressPercent}%` }}
        >
          {statuses[statusIndex]}
        </div>
      </div>

      <div className="d-flex justify-content-between flex-wrap">
        {statuses.map((status, index) => (
          <div
            key={index}
            className={`text-center flex-fill p-3 m-1 border rounded ${
              index === statusIndex
                ? 'bg-warning text-white'
                : index < statusIndex
                ? 'bg-success text-white'
                : 'bg-light'
            }`}
          >
            <i className={`bi ${icons[index]} mb-2`} style={{ fontSize: '1.5rem' }}></i>
            <div>{status}</div>
          </div>
        ))}
      </div>

      {/* Render the cancel button only if the order is in "Order Received" status */}
      {canCancel && (
        <div className="text-center mt-4">
          <button className="btn btn-danger" onClick={handleCancelOrder}>
            Cancel Order
          </button>
        </div>
      )}

      {/* Display a cancellation message if the user cannot cancel */}
      {cancelMessage && (
        <div className="alert alert-warning mt-3">
          <strong>Note: </strong> {cancelMessage}
        </div>
      )}
    </div>
  );
}

export default OrderStatusPage;
