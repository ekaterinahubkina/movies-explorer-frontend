import logo from '../../images/logo.svg';
import './Header.css';

function Header() {
    return (
        <header className='header'>
            <div className='header__wrapper'>
                <img className='logo' src={logo} alt='логотип'></img>
                <div className='header__auth'>
                    <a className='header__register' href='#'>Регистрация</a>
                    <button className='header__login-btn'>Войти</button>
                </div>
            </div>
        </header>
    )
}

export default Header;