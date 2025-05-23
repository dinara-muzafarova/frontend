import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(); // перезагрузка для сброса состояния
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="logo">Кафедра</h1>
        <div className="nav-links">
          <Link to="/teachers">Преподаватели</Link>
          <Link to="/achievements">Достижения</Link>
          <Link to="/reviews">Отзывы</Link>
          <Link to="/media">Галерея</Link>
          <Link to="/partners">Партнёры</Link>
          <Link to="/submit-review">Оставить отзыв</Link>
          <Link to="/account">Личный кабинет</Link>
          {!token ? (
            <>
                <Link to="/login">Войти</Link>
                <Link to="/register" style={{ marginLeft: '10px' }}>Регистрация</Link>
            </>
            ) : (
            <button onClick={handleLogout} style={{ marginLeft: '15px' }}>Выйти</button>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
