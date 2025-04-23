import React, { useEffect, useState } from 'react';

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
  
    if (currentUser) {
      const userOrders = allOrders.filter(order => order.username === currentUser.username);
      setOrders(userOrders.reverse());
    }
  }, []);
  
  

  return (
    <div className="container mt-4">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mb-3">
            <div className="card-header">
              <strong>Order #{order.id}</strong> — <small>{order.date}</small>
            </div>
            <ul className="list-group list-group-flush">
              {order.items.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between">
                  {item.name}
                  <span>₹{item.price}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <strong>Total</strong>
                <strong>₹{order.total}</strong>
              </li>
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistoryPage;
