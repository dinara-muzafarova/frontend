import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(); 
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
  <Link to="/"><img src="/logoasu.png" alt="Logo" /></Link>
</div>
        <div className="nav-links">
          <Link to="/history">История</Link>
          <Link to="/achievements">Достижения</Link>
          <Link to="/reviews">Отзывы</Link>
          <Link to="/media">Галерея</Link>
          {!token ? (
            <>
              <Link to="/login">Войти</Link>
              <Link to="/register" style={{ marginLeft: '10px' }}>Регистрация</Link>
            </>
          ) : (
            <>
              <Link to="/account" style={{ marginLeft: '10px' }}>Личный кабинет</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
