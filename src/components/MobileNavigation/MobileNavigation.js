import './MobileNavigation.css';
// import '../Navigation/Navigation.css';
import { Link, NavLink } from 'react-router-dom';
// import { useState } from 'react';


const MobileNavigation = (props) => {

// const closeNavPopup = () => {
//     isChecked = false;
// }
    const linkActiveClass = ({ isActive }) => {
        return `header__link header__link_mobile ${isActive && 'header__link_mob-active'}`;
    }

    // const location = useLocation();

    return (
        <article className={`mobile-navigation ${props.isMobileMenuOpen && 'mobile-navigation_visible'}`}>
            <div className='mobile-navigation__popup'>
                <div>
                    <NavLink to='/' onClick={props.onCloseMobileMenu} className={linkActiveClass}>Главная</NavLink>
                    <NavLink to='/movies' onClick={props.onCloseMobileMenu} className={linkActiveClass}>Фильмы</NavLink>
                    <NavLink to='/saved-movies' onClick={props.onCloseMobileMenu} className={linkActiveClass}>Сохранённые фильмы</NavLink>
                </div>
                <Link to='/profile' className='header__profile-btn header__profile-btn_mobile'>Аккаунт<div></div></Link>
            </div>
        </article>
    )
}

export default MobileNavigation;