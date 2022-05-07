import logo from '../../images/logo.svg';
import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Header({ location }) {
    return (
        <header className={`header ${location.pathname === '/' && 'header_main'}`}>
            <div className='header__wrapper'>
                <div className='header__content'>
                    <Link to='/'><img className='logo' src={logo} alt='логотип'></img></Link>
                    <Navigation location={location} />
                    <BurgerMenu location={location}/>
                </div>
            </div>
        </header>
    )
}

export default Header;