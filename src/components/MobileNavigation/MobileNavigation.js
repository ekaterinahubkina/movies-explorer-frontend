import './MobileNavigation.css';
import { Link, NavLink } from 'react-router-dom';

const MobileNavigation = (props) => {

    const closeNavPopup = () => {
        props.isChecked = false;
    }
    const linkActiveClass = ({ isActive }) => {
        return `header__link header__link_mobile ${isActive && 'header__link_mob-active'}`;
    }

    return (
        <article className={`mobile-navigation ${props.isChecked && 'mobile-navigation_visible'}`}>
            <div className='mobile-navigation__popup'>
                <div>
                    <NavLink to='/' onClick={props.onCloseMobileMenu && closeNavPopup} className={linkActiveClass}>Главная</NavLink>
                    <NavLink to='/movies' onClick={props.onCloseMobileMenu && closeNavPopup} className={linkActiveClass}>Фильмы</NavLink>
                    <NavLink to='/saved-movies' onClick={props.onCloseMobileMenu && closeNavPopup} className={linkActiveClass}>Сохранённые фильмы</NavLink>
                </div>
                <Link to='/profile' onClick={props.onCloseMobileMenu && closeNavPopup} className='header__profile-btn header__profile-btn_mobile'>Аккаунт<div></div></Link>
            </div>
        </article>
    )
}

export default MobileNavigation;