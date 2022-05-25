import './MobileNavigation.css';
import { Link, NavLink } from 'react-router-dom';

const MobileNavigation = ({ isChecked, onCloseMobileMenu }) => {

    const closeNavPopup = () => {
        onCloseMobileMenu()
    }
    const linkActiveClass = ({ isActive }) => {
        return `header__link header__link_mobile ${isActive && 'header__link_mob-active'}`;
    }

    return (
        <article className={`mobile-navigation ${isChecked && 'mobile-navigation_visible'}`}>
            <div className='mobile-navigation__popup'>
                <div>
                    <NavLink to='/' onClick={closeNavPopup} className={linkActiveClass}>Главная</NavLink>
                    <NavLink to='/movies' onClick={closeNavPopup} className={linkActiveClass}>Фильмы</NavLink>
                    <NavLink to='/saved-movies' onClick={closeNavPopup} className={linkActiveClass}>Сохранённые фильмы</NavLink>
                </div>
                <Link to='/profile' onClick={closeNavPopup} className='header__profile-btn header__profile-btn_mobile'>Аккаунт<div></div></Link>
            </div>
        </article>
    )
}

export default MobileNavigation;