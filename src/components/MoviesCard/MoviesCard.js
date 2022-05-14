import './MoviesCard.css';

const MoviesCard = ({ location }) => {
    return (
        <article className='movies-card'>
            <img className='movies-card__image' src='https://images.unsplash.com/photo-1627975186698-093fd61b9a7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8NnNNVmpUTFNrZVF8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60' alt='Карточка фильма'></img>
            <div>
                <h2 className='movies-card__title'>33 слова о дизайне</h2>
                {location.pathname === '/movies' ?
                    <button className='movies-card__like-btn movies-card__like-btn_active'></button>
                    :
                    <button className='movies-card__delete-btn'></button>}
            </div>
            <p className='movies-card__duration'>1ч 47м</p>
        </article>
    )
}

export default MoviesCard;