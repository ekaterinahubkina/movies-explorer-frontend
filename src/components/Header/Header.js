import logo from '../../images/logo.svg';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Header({ loggedIn }) {
    const location = useLocation();

    return (
        <header className={`header ${location.pathname === '/' && 'header_main'}`}>
            <div className='header__wrapper'>
                <div className='header__content'>
                    <Link to='/'><img className='logo' src={logo} alt='логотип'></img></Link>
                    <Navigation loggedIn={loggedIn} />
                    {loggedIn &&
                        <BurgerMenu />
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;