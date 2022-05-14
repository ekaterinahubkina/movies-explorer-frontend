import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import { useState } from 'react';

const Register = () => {
const [inputNameValue, setInputNameValue] = useState('');
const [inputEmailValue, setInputEmailValue] = useState('');
const [inputPasswordValue, setInputPasswordValue] = useState('');

const [errorName, setErrorName] = useState('');
const [errorEmail, setErrorEmail] = useState('');
const [errorPassword, setErrorPassword] = useState('');

const [isValidInputName, setIsValidInputName] = useState(false);
const [isValidInputEmail, setIsValidInputEmail] = useState(false);
const [isValidInputPassword, setIsValidInputPassword] = useState(false);

const handleInputNameChange = (event) => {
    const input = event.target;
    setInputNameValue(input.value);
    setIsValidInputName(input.validity.valid);
    !isValidInputName ? setErrorName(input.validationMessage) : setErrorName('');
}

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
        <AuthForm titleText='Добро пожаловать!' buttonText='Зарегистрироваться' spanText='Уже зарегистрированы?' linkText='Войти' linkTo='/signin' >
            <label htmlFor='register-name' className='form__label'>Имя</label>
            <input type='text' id='register-name' className='form__input form__input_type_name' 
            required minLength='2' maxLength='30' value={inputNameValue} onChange={handleInputNameChange}></input>
            <span className='form__error'>{errorName}</span>
            <label htmlFor='register-email' className='form__label'>E-mail</label>
            <input type='email' id='register-email' className='form__input form__input_type_email' 
            required value={inputEmailValue} onChange={handleInputEmailChange}></input>
            <span className='form__error'>{errorEmail}</span>
            <label htmlFor='register-password' className='form__label'>Пароль</label>
            <input type='password' id='register-password' className='form__input form__input_type_password' 
            required minLength='4' maxLength='30' value={inputPasswordValue} onChange={handleInputPasswordChange}></input>
            <span className='form__error'>{errorPassword}</span>
        </AuthForm>
    )
}

export default Register;