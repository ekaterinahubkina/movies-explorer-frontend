import './Login.css';

import AuthForm from '../AuthForm/AuthForm';

const Login = () => {
    return (
        <AuthForm titleText='Рады видеть!' buttonText='Войти' spanText='Ещё не зарегистрированы?' linkText='Регистрация' linkTo='/signup'>
            <label htmlFor='login-email' className='form__label'>E-mail</label>
            <input type='email' id='login-email' className='form__input form__input_type_email'></input>
            <label htmlFor='login-password' className='form__label'>Пароль</label>
            <input type='password' id='login-password' className='form__input form__input_type_password'></input>
        </AuthForm>
    )
}

export default Login;