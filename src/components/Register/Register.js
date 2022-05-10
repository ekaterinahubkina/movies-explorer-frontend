import './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <section className='section register'>
            <form className='form'>
                <h2 className='form__title'>Добро пожаловать!</h2>
                <div className='form__input-container'>
                    <label htmlFor='register-name'>Имя</label>
                    <input type='text' id='register-name'></input>
                    <label htmlFor='register-email'>E-mail</label>
                    <input type='email' id='register-email'></input>
                    <label htmlFor='register-password'>Пароль</label>
                    <input type='text' id='register-password'></input>
                    <span className='form__error'></span>
                </div>
                <button className='form__button'></button>
            </form>
            <span className='form__signin'>Уже зарегистрированы? <Link className="form__link" to="/signin">Войти</Link></span>
        </section>
    )
}

export default Register;