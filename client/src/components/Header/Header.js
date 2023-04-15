import logo from '../../images/logo.png'
import './Header.css'
import React from 'react'
import { Link } from 'react-router-dom'

function Header({isMobile, isBurgerMenuCliked, isbagCliked, total}) {

  return (
      <header className="header">
        <Link className='header-logo' to="/">
          <img src={logo} className="header-logo" alt="logo" />
        </Link>
        
        {isMobile?
        <p className='header__burger' onClick={isBurgerMenuCliked}></p>:
        <ul className="header__nav-wrapper">
          <li className="header__nav">
            <Link className='header__listlink' to="/">О компании</Link>
          </li>
          <li className="header__nav">
          <Link className='header__listlink' to="/equipment">Торговое оборудование</Link>
          </li>
          <li className="header__nav">
          <Link className='header__listlink' to="/services">Услуги</Link>
          </li>
          <li className="header__nav-bag">
            <button className="header__nav-bag-text" onClick={isbagCliked}>Корзина</button>
            <button className="header__nav-bag-btn" onClick={isbagCliked}></button>
            <div className="header__total-count">{total.count}</div>
          </li>
          <li className="header__nav">8(962)440-07-40</li>
        </ul>
        }
      </header>
  );
}

export default Header;