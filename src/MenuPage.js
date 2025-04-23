import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// Sample menu with added 'available' property to simulate stock availability
const sampleMenu = [
  { id: 1, name: 'Mix Veg Sandwich', price: 50, image: 'https://cdn.pixabay.com/photo/2017/05/31/02/56/food-photography-2358904_1280.jpg', available: true },
  { id: 2, name: 'Chicken Burger', price: 80, image: 'https://cdn.pixabay.com/photo/2022/05/05/05/48/burger-7175344_1280.jpg', available: true },
  { id: 3, name: 'Paneer Subway', price: 80, image: 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863_1280.jpg', available: true },
  { id: 4, name: 'Bread Omelette', price: 50, image: 'https://cdn.pixabay.com/photo/2017/04/04/17/32/food-2202352_1280.jpg', available: false },
  { id: 5, name: 'Plain Maggie', price: 30, image: 'https://cdn.pixabay.com/photo/2016/02/22/17/05/food-1216048_1280.jpg', available: true },
  { id: 6, name: 'French Fries', price: 50, image: 'https://cdn.pixabay.com/photo/2020/06/23/14/33/french-fries-5332766_1280.jpg', available: true },
  { id: 7, name: 'Paneer Masala Kulcha', price: 50, image: 'https://cdn.pixabay.com/photo/2017/04/06/23/15/food-2209594_1280.jpg', available: true },
  { id: 8, name: 'Red Sauce Pasta', price: 70, image: 'https://cdn.pixabay.com/photo/2017/03/14/08/04/pasta-2142229_1280.jpg', available: true },
  { id: 9, name: 'Mix Veg Pizza', price: 140, image: 'https://cdn.pixabay.com/photo/2020/05/17/04/22/pizza-5179939_1280.jpg', available: false },
  { id: 10, name: 'Chicken Pizza', price: 180, image: 'https://cdn.pixabay.com/photo/2015/02/13/11/04/pizza-634967_1280.jpg', available: true },
  { id: 11, name: 'Tea', price: 15, image: 'https://cdn.pixabay.com/photo/2015/10/07/05/47/chai-975685_1280.jpg', available: true },
  { id: 12, name: 'Coffee', price: 25, image: 'https://cdn.pixabay.com/photo/2016/11/29/12/45/beverage-1869598_1280.jpg', available: true },
  { id: 13, name: 'Paneer Patty', price: 40, image: 'https://cdn.pixabay.com/photo/2013/10/24/20/17/apple-bags-200430_1280.jpg', available: true },
  { id: 14, name: 'Egg Roll', price: 60, image: 'https://cdn.pixabay.com/photo/2019/03/02/14/26/shawarma-4029889_1280.jpg', available: true },
  { id: 15, name: 'Veg Kathi Roll', price: 50, image: 'https://cdn.pixabay.com/photo/2022/03/11/10/06/wrap-7061741_1280.jpg', available: true },
  { id: 16, name: 'Choco Chip Muffin', price: 40, image: 'https://cdn.pixabay.com/photo/2023/07/20/11/00/muffin-8139065_1280.jpg', available: true },
  { id: 17, name: 'Walnut Brownie', price: 70, image: 'https://cdn.pixabay.com/photo/2014/11/28/08/03/brownie-548591_1280.jpg', available: true },
  { id: 18, name: 'Veg Hot Dog', price: 50, image: 'https://cdn.pixabay.com/photo/2021/02/15/11/43/hot-dog-6017568_1280.jpg', available: true },
  { id: 19, name: 'Chicken Seekh Kebab', price: 80, image: 'https://cdn.pixabay.com/photo/2019/12/19/19/39/shish-kebab-4706940_1280.jpg', available: true },
  { id: 20, name: 'Cheese Corn Pizza', price: 150, image: 'https://cdn.pixabay.com/photo/2014/02/06/09/03/city-259794_1280.jpg', available: true },
  { id: 21, name: 'Chicken Sandwich', price: 80, image: 'https://cdn.pixabay.com/photo/2016/11/29/04/00/bread-1867208_1280.jpg', available: true },
];

function MenuPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage if available
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);  // This effect runs only once when the component mounts

  // Save cart to localStorage when cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);  // This effect runs whenever the cart changes

  const addToCart = (item) => {
    if (!item.available) {
      alert(`${item.name} is currently out of stock.`);
      return;
    }

    const existingIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    if (existingIndex === -1) {
      setCart([...cart, { ...item, quantity: 1 }]);
    } else {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
    }
  };

  const removeOneFromCart = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
  };

  const removeItemFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1); // Remove the entire item
    setCart(updatedCart);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Menu</h2>
      <div className="row">
        {sampleMenu.map((item) => {
          const inCart = cart.find(cartItem => cartItem.id === item.id);
          return (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={item.image} className="card-img-top" alt={item.name} />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">₹{item.price}</p>
                  <button
                    className="btn btn-success mt-auto"
                    onClick={() => addToCart(item)}
                    disabled={!item.available}
                  >
                    <i className="fas fa-shopping-cart me-2"></i> {/* Cart Icon */}
                    {item.available ? (inCart ? `+ ${inCart.quantity}` : 'Add to Cart') : 'Out of Stock'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <hr />

      {/* Cart fixed to the bottom-right */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        width: '300px',
        zIndex: 1000,
      }}>
        <h4>Cart</h4>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            <ul className="list-group">
              {cart.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    {item.name} - ₹{item.price} x {item.quantity}
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-primary btn-sm mx-1"
                      onClick={() => removeOneFromCart(index)}
                      style={{ padding: '5px 10px' }}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItemFromCart(index)}
                      style={{ padding: '5px 10px' }}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="btn btn-warning mt-3 w-100"
              onClick={() => navigate('/checkout')}
            >
              Go to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MenuPage;
