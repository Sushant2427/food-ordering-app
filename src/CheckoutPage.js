import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/login');
      return;
    }
  
    const newOrder = {
      id: Date.now(),
      username: currentUser.username,
      date: new Date().toLocaleString(),
      items: cart,
      total: getTotalPrice()
    };
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
  localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));
  localStorage.setItem('latestOrderId', newOrder.id);
  localStorage.removeItem('cart'); // Clear cart after order

    localStorage.setItem('orderTime', new Date().getTime());

  
    navigate('/order-status', { state: { orderId: newOrder.id } });
    navigate('/payment', { state: { cart } });
  };
  
  

  return (
    <div className="container mt-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '40px 0' }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow-sm">
            {/* Decorative Image Inside Card */}
            
            <h2 className="mb-4 text-center" style={{ color: '#4CAF50' }}>Checkout</h2>

            {cart.length === 0 ? (
              <p className="text-center">Your cart is empty.</p>
            ) : (
              <>
                <ul className="list-group mb-3">
                  {cart.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{item.name}</strong> (x{item.quantity})
                      </div>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>

                <div className="d-flex justify-content-between mb-4">
                  <h4>Total: ₹{getTotalPrice()}</h4>
                </div>

                <div className="d-flex justify-content-between">
                  <button 
                    className="btn btn-success w-50" 
                    onClick={handlePlaceOrder}
                    style={{ fontSize: '16px' }}
                  >
                    Place Order
                  </button>
                  <button 
                    className="btn btn-secondary w-50 ms-2" 
                    onClick={() => navigate('/menu')}
                    style={{ fontSize: '16px' }}
                  >
                    Go Back
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
