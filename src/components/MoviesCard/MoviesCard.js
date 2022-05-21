import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

const MoviesCard = ({ card, handleMovieCardLike, handleDeleteMovie, savedMoviesIds, onDislikeMovie }) => {
    const location = useLocation();
    const [isLiked, setIsLiked] = useState(false);
    const [likedMovies, setLikedMovies] = useState([]);

    const handleLike = () => {
        setIsLiked(true);
        setLikedMovies([card.id, ...likedMovies])
        handleMovieCardLike(card);
    }

    const handleDislike = () => {
        setIsLiked(false);
        onDislikeMovie(card.id);
    }

    const checkLikeStatus = () => {
        savedMoviesIds.includes(card.id) ? setIsLiked(true) : setIsLiked(false);
    }

    useEffect(checkLikeStatus, [card.id, savedMoviesIds])

    

    const deleteMovie = () => {
        handleDeleteMovie(card);
    }
    
    const serverUrl = 'https://api.nomoreparties.co';
    const movieDuration = (min) => {
        return `${Math.floor(min / 60)}ч ${min % 60}мин`;
    }

    
    return (
        <article className='movies-card'>
            <a href={card.trailerLink} target='blank'><img className='movies-card__image' src={location.pathname === '/movies' ? serverUrl + card.image.url : card.image} alt={card.nameRU}></img></a>
            <div>
                <h2 className='movies-card__title'>{card.nameRU}</h2>
                {location.pathname === '/movies' ?
                    <button className={`movies-card__like-btn ${isLiked && 'movies-card__like-btn_active'}`} onClick={isLiked ? handleDislike : handleLike}></button>
                    :
                    <button className='movies-card__delete-btn' onClick={deleteMovie}></button>}
            </div>
            <p className='movies-card__duration'>{movieDuration(card.duration)}</p>
        </article>
    )
}

export default MoviesCard;