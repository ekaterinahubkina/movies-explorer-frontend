import './Register.css';
import AuthForm from '../AuthForm/AuthForm';
import { useFormWithValidation } from '../useFormWithValidation/useFormWithValidation';

const Register = ({ onRegisterSubmit }) => {
    const { values, errors, isValid, handleChange } = useFormWithValidation();

    const onSubmit = (event) => {
        event.preventDefault();
        onRegisterSubmit(values)
    }

    return (
        <AuthForm onSubmit={onSubmit} isValid={isValid} titleText='Добро пожаловать!' buttonText='Зарегистрироваться' spanText='Уже зарегистрированы?' linkText='Войти' linkTo='/signin' >
            <label htmlFor='register-name' className='form__label'>Имя</label>
            <input type='text' id='register-name' name='name' className='form__input form__input_type_name'
                required minLength='2' maxLength='30' value={values.name || ''} onChange={handleChange}></input>
            <span className='form__error'>{errors.name}</span>
            <label htmlFor='register-email' className='form__label'>E-mail</label>
            <input type='email' id='register-email' name='email' className='form__input form__input_type_email'
                required value={values.email || ''} onChange={handleChange}></input>
            <span className='form__error'>{errors.email}</span>
            <label htmlFor='register-password' className='form__label'>Пароль</label>
            <input type='password' id='register-password' name='password' className='form__input form__input_type_password'
                required minLength='4' maxLength='30' value={values.password || ''} onChange={handleChange}></input>
            <span className='form__error'>{errors.password}</span>
        </AuthForm>
    )
}

export default Register;