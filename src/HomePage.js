import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div 
      className="hero-section d-flex align-items-center justify-content-center text-white"
      style={{
        height: '95vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1600891964599-f61ba0e24092)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <div 
        className="bg-dark bg-opacity-50 p-5 text-center rounded"
        style={{ maxWidth: '500px' }}
      >
        <h1 className="display-4 mb-4">Craving Something Delicious? 🍕</h1>
        <p className="lead">Delicious meals, delivered fast.</p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/menu" className="btn btn-warning btn-lg">
            Go to Menu
          </Link>
          <Link to="/history" className="btn btn-outline-light btn-lg">
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
