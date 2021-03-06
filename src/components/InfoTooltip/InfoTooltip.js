import './InfoTooltip.css';
import tick from "../../images/tick.svg";
import cross from "../../images/cross.svg"
import { useLocation } from 'react-router-dom';

function InfoTooltip({ isOpen, onClose, isRequestOk }) {
    const location = useLocation();

    const figcaptionText = isRequestOk ? "Успешно!" :
        location.pathname === '/movies' ? "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            : "Что-то пошло не так! Попробуйте ещё раз.";

    return (
        <article className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_infoTool">
                <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
                <figure className="popup__figure">
                    <img className='popup__image' src={isRequestOk ? tick : cross} alt="успешно" />
                    <figcaption className="popup__figcaption popup__figcaption_type_infoTool">{figcaptionText}</figcaption>
                </figure>
            </div>
        </article>
    );
}

export default InfoTooltip;