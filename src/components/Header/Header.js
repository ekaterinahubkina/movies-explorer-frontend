import logo from '../../images/logo.svg';
import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
// import { useEffect, useState } from 'react';

function Header({ location, currentWidth, isMobileMenuOpen, onBurgerMenuClick, onCloseMobileMenu }) {

    return (
        <header className={`header ${location.pathname === '/' && 'header_main'}`}>
            <div className='header__wrapper'>
                <div className='header__content'>
                    {currentWidth >= 1280 ?
                        <>
                            <Link to='/'><img className='logo' src={logo} alt='логотип'></img></Link>
                            <Navigation location={location} currentWidth={currentWidth}/>
                        </>
                        :
                        <>
                            <Link to='/'><img className='logo' src={logo} alt='логотип'></img></Link>
                            <Navigation location={location} currentWidth={currentWidth}/>
                            <BurgerMenu 
                            location={location} 
                            currentWidth={currentWidth}
                            isMobileMenuOpen={isMobileMenuOpen}
                            onBurgerMenuClick={onBurgerMenuClick}
                            onCloseMobileMenu={onCloseMobileMenu}/>
                        </>

                    }
                    {/* <Link to='/'><img className='logo' src={logo} alt='логотип'></img></Link>
                    <Navigation location={location} />
                    <BurgerMenu location={location}/> */}
                </div>
            </div>
        </header>
    )
}

export default Header;