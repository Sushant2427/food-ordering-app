import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function Layout({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null); // Set user to null when logged out
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light px-4 shadow-sm d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" 
            alt="Logo" 
            width="40" 
            height="40" 
            className="me-2"
          />
          <span style={{ fontWeight: 'bold' }}>KRMUnch</span>
        </Link>

        <div className="d-flex align-items-center gap-2">
          <Link to="/menu" className="btn btn-outline-primary">🍽️ Menu</Link>
          <Link to="/checkout" className="btn btn-outline-success">🛒 Cart</Link>

          {user ? (
            <>
              <span className="text-muted ms-3">Hi, {user.username}</span>
              <button className="btn btn-outline-danger btn-sm ms-2" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary btn-sm ms-2">Login</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Signup</Link>
            </>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Layout;
