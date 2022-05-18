import './MoviesCard.css';

const MoviesCard = ({ card, location }) => {
const serverUrl = 'https://api.nomoreparties.co';
const movieDuration = (min) => {
    return `${Math.floor(min / 60)}ч ${min % 60}мин`;
}
    return (
        <article className='movies-card'>
            <a href={card.trailerLink} target='blank'><img className='movies-card__image' src={serverUrl + card.image.url} alt={card.nameRU}></img></a>
            <div>
                <h2 className='movies-card__title'>{card.nameRU}</h2>
                {location.pathname === '/movies' ?
                    <button className='movies-card__like-btn movies-card__like-btn_active'></button>
                    :
                    <button className='movies-card__delete-btn'></button>}
            </div>
            <p className='movies-card__duration'>{movieDuration(card.duration)}</p>
        </article>
    )
}

export default MoviesCard;