import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-logo">Trabajo Practico 7 - Lenguaje IV</div>
      <nav className="header-nav">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/blob" className="nav-link">Proyecto Blob</Link>
        <Link to="/acerca" className="nav-link">Acerca de</Link>
        <Link to="/contacto" className="nav-link">Contacto</Link>
      </nav>
    </header>
  );
}

export default Header;