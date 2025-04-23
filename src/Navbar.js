import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));


  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
          alt="Logo"
          style={{ height: '40px', objectFit: 'contain', marginRight: '10px' }}
        />
        <strong>SnackHub</strong>
      </Link>

      <div className="ms-auto d-flex align-items-center gap-2">
        <Link to="/menu" className="nav-link">Menu</Link>
        <Link to="/cart" className="nav-link">Cart</Link>

        {user ? (
          <>
            <span className="nav-link disabled text-muted">Hi, {user.username}</span>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-primary btn-sm">Login</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
