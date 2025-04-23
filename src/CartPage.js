import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart(); // Access cart from context

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <span>{item.name} - ₹{item.price} x {item.quantity}</span>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))
      )}
      <h2>Total: ₹{total}</h2>
      <button onClick={clearCart}>Clear Cart</button>
      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
}

export default CartPage;
