import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';

const Navigation = ({ location }) => {

const linkActiveClass = ({isActive}) => {
    return `header__link ${isActive && 'header__link_active'}`;  
}

    return (
        <>
            {
                location.pathname === '/' ?
                    <div className='header__auth'>
                        <Link to='/signup' className='header__register'>Регистрация</Link>
                        <Link to='signin'><button className='header__login-btn'>Войти</button></Link>
                    </div>
                    :
                    <>
                    <div className='header__navigation'>
                        <NavLink to='/movies' className={linkActiveClass}>Фильмы</NavLink>
                        <NavLink to='/saved-movies' className={linkActiveClass}>Сохранённые фильмы</NavLink>
                    </div>
                    <Link to='/profile' className='header__profile-btn'>Аккаунт<div></div></Link>
                    </>
            }
            {/* {
                location.pathname === '/movies' || location.pathname === 'saved-movies' &&
                <div className=''
        } */}
        </>
    )
}

export default Navigation;