import "./Profile.css";
import { useState } from "react";

const Profile = ({ name, email }) => {
    const [inputNameValue, setInputNameValue] = useState(name);
    const [inputEmailValue, setInputEmailValue] = useState(email);

    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    const [isValidInputName, setIsValidInputName] = useState(false);
    const [isValidInputEmail, setIsValidInputEmail] = useState(false);

    const [readOnly, setReadOnly] = useState(true);
    // const [isFormValid, setIsFormValid] = useState(false);
    // (isValidInputEmail && isValidInputName) && setIsFormValid(true);

    const handleUpdateButtonClick = (event) => {
        event.preventDefault();
        setReadOnly(false);
    }

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

    const handleUpdateUserInfoSubmit = (event) => {
        event.preventDefault();
        alert('form submitted');
        setInputNameValue(name);
        setInputEmailValue(email);
        setIsValidInputEmail(false);
        setIsValidInputName(false);
        setReadOnly(true);
    }

    return (
        <section className="profile">
            <form className="profile__container" onSubmit={handleUpdateUserInfoSubmit}>
                <h2 className="profile__greeting">Привет, {name}!</h2>
                <div className="profile__info">
                    <div className="profile__info-container">
                        <label htmlFor="name">Имя</label>
                        <input id="name" type='text' className="profile__input profile__input_type_name"
                            value={inputNameValue} onChange={handleInputNameChange}
                            required minLength='2' maxLength='30' readOnly={readOnly}></input>
                    </div>
                    <span className='form__error'>{errorName}</span>
                    <div className="profile__info-container">
                        <label htmlFor="email">E-mail</label>
                        <input id='email' type='email' className="profile__input profile__input_type_email"
                            value={inputEmailValue} onChange={handleInputEmailChange}
                            required readOnly={readOnly}></input>
                    </div>
                    <span className='form__error'>{errorEmail}</span>
                </div>
                <div className="profile__buttons">
                    {isValidInputName && isValidInputEmail ?
                        <button type='submit' className="profile__button profile__button_type_submit">Сохранить</button>
                        :
                        <>
                            <button type='button' className="profile__button profile__button_type_update"
                                onClick={handleUpdateButtonClick}>Редактировать</button>
                            <button className="profile__button profile__button_type_exit">Выйти из аккаунта</button>
                        </>}

                </div>
            </form>
        </section>
    )
}

export default Profile;