import './Register.css';
import AuthForm from '../AuthForm/AuthForm';

const Register = () => {
    return (
        <AuthForm titleText='Добро пожаловать!' buttonText='Зарегистрироваться' spanText='Уже зарегистрированы?' linkText='Войти' linkTo='/signin' >
            <label htmlFor='register-name' className='form__label'>Имя</label>
            <input type='text' id='register-name' className='form__input form__input_type_name' required minLength='2' maxLength='30'></input>
            <label htmlFor='register-email' className='form__label'>E-mail</label>
            <input type='email' id='register-email' className='form__input form__input_type_email' required></input>
            <label htmlFor='register-password' className='form__label'>Пароль</label>
            <input type='password' id='register-password' className='form__input form__input_type_password' required minLength='4' maxLength='30'></input>
            <span className='form__error'>Что-то пошло не так...</span>
        </AuthForm>
    )
}

export default Register;