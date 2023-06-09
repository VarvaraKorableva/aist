import logo from '../../images/logo.png'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
      <footer className="footer">
        <img src={logo} className="footer-logo" alt="logo" />
        <div className="footer__wrapper">
            <div className="footer__wrapper-container">
                <ul className="footer__info-container">
                    <li className="footer__info-container-li footer__info-container-li-ip">ИП Шашкова Зоя Федоровна</li>

                    <li className="footer__info-container-li">ОГРНИП: 319265100139440</li>
                    <li className="footer__info-container-li footer__info-container-li-iin">ИНН: 261901001245</li>

                    <li className="footer__info-container-li-text">Официальным поставщиком ПО 1С версии «ПРОФ» является фирма 1С:Франчайзинг ООО «Волгаторг»</li>

                    <li className="footer__info-container-li footer__info-container-li-mail">
                      <a className='footer__listlink' href="mailto:support@it-aist.ru">support@it-aist.ru</a>
                    </li>

                    <li className="footer__info-container-li footer__info-container-li-tel">
                      <a className='footer__listlink' href="tel:89624400740">8(962)440-07-40</a>
                    </li>
                    <li className="footer__info-container-li">8(8652)40-07-40</li>

                </ul>
                <nav className="footer__nav-wrapper">
                    <ul className="footer__nav-container">
                        <li className="footer__nav-container-li">
                          <Link className='footer__nav-container-link' to="/">О компании</Link>
                        </li>
                        <li className="footer__nav-container-li">
                          <Link className='footer__nav-container-link' to="/equipment">Торговое оборудование</Link>
                        </li>
                        <li className="footer__nav-container-li">
                          <Link className='footer__nav-container-link' to="/services">Услуги</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <nav className="footer__links-nav">
                <ul className="footer__links-container">
                    <li className="footer__links-container-li">Политика конфиденциальности</li>
                    <li className="footer__links-container-li">Обработка персональных данных</li>
                    <li className="footer__links-container-li">Пользовательское соглашение</li>
                    <li className="footer__links-container-li">
                    <Link className='footer__links-container-link' to="/information">Дополнительная информация</Link>
                    </li>
                    
                </ul>
            </nav>
        </div>
      </footer>
  );
}

export default Footer;