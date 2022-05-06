import logo from '../../images/logo.svg';
import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ location }) {
    return (
        <header className={`header ${location.pathname === '/' && 'header_main'}`}>
            <div className='header__wrapper'>
                <div className='header__content'>
                    <Link to='/'><img className='logo' src={logo} alt='логотип'></img></Link>
                    <Navigation location={location} />
                </div>
                {/* {location.pathname === '/' &&
                <div className='header__auth'>
                    <Link to='/signup' className='header__register'>Регистрация</Link>
                    <Link to='signin'><button className='header__login-btn'>Войти</button></Link>
                </div>} */}

            </div>
        </header>
    )
}

export default Header;