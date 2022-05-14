import './Login.css';
import AuthForm from '../AuthForm/AuthForm';
import { useState } from 'react';

const Login = () => {
    const [inputEmailValue, setInputEmailValue] = useState('');
    const [inputPasswordValue, setInputPasswordValue] = useState('');
    
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    
    const [isValidInputEmail, setIsValidInputEmail] = useState(false);
    const [isValidInputPassword, setIsValidInputPassword] = useState(false);
    
    const handleInputEmailChange = (event) => {
        const input = event.target;
        setInputEmailValue(input.value);
        setIsValidInputEmail(input.validity.valid);
        !isValidInputEmail ? setErrorEmail(input.validationMessage) : setErrorEmail('');
    }
    
    const handleInputPasswordChange = (event) => {
        const input = event.target;
        setInputPasswordValue(input.value);
        setIsValidInputPassword(input.validity.valid);
        !isValidInputPassword ? setErrorPassword(input.validationMessage) : setErrorPassword('');
    }
    return (
        <AuthForm titleText='Рады видеть!' buttonText='Войти' spanText='Ещё не зарегистрированы?' linkText='Регистрация' linkTo='/signup'>
            <label htmlFor='login-email' className='form__label'>E-mail</label>
            <input type='email' id='login-email' className='form__input form__input_type_email' 
            required value={inputEmailValue} onChange={handleInputEmailChange}></input>
            <span className='form__error'>{errorEmail}</span>
            <label htmlFor='login-password' className='form__label'>Пароль</label>
            <input type='password' id='login-password' className='form__input form__input_type_password' 
            required minLength='4' maxLength='30' value={inputPasswordValue} onChange={handleInputPasswordChange}></input>
            <span className='form__error'>{errorPassword}</span>
        </AuthForm>
    )
}

export default Login;