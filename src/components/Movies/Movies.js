import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState } from 'react';
import filterMovies from '../../utils/functions';

function Movies({ movies, onSearchSubmit, numberOfCardsToRender, numberOfCardsToAdd, onSaveMovie, onDeleteMovie, savedMoviesIds, onDislikeMovie }) {

    const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
    const [cardsToRender, setCardsToRender] = useState(numberOfCardsToRender);

    // const filterMovies = (arr, str, checkboxStatus) => {
    //     const filteredMovies = arr.filter((item) => {
    //         const nameRuToLowerCase = item.nameRU.toLowerCase();
    //         const searchMessageToLowerCase = str.toLowerCase();
    //         return nameRuToLowerCase.includes(searchMessageToLowerCase);
    //     })
    //     const filteredShortMovies = filteredMovies.filter((item) => item.duration <= 40);
    //     return checkboxStatus ? filteredShortMovies : filteredMovies;
    // }

    const handleSearch = (message, isChecked) => {
        onSearchSubmit((movies) => {
            const result = filterMovies(movies, message, isChecked)
            setFilteredMovies(result);
            localStorage.setItem('filteredMovies', JSON.stringify(result));
        });
        

    }

    const handleButtonMoreClick = () => {
        setCardsToRender(cardsToRender + numberOfCardsToAdd)
    }

    const handleMovieCardLike = (card) => {
        onSaveMovie(card)
    }

    return (
        <section className='movies'>
            <div className='movies__wrapper'>
                <SearchForm onSearchSubmit={handleSearch} />
                {filteredMovies.length === 0 ?
                    <span className='movies__nothing-found'>Ничего не найдено</span>
                    :
                    <>
                        <MoviesCardList>
                            {filteredMovies.slice(0, cardsToRender).map((item) => (
                                <MoviesCard card={item} {...item} key={item.id} handleMovieCardLike={handleMovieCardLike} savedMoviesIds={savedMoviesIds}
                                    onDislikeMovie={onDislikeMovie} />
                            ))}
                        </MoviesCardList>
                        {filteredMovies.length > filteredMovies.slice(0, numberOfCardsToRender).length && filteredMovies.length !== cardsToRender ?
                            <div className='more-btn-container'>
                                <button className='more-btn' onClick={handleButtonMoreClick}>Ещё</button>
                            </div>
                            :
                            null}
                    </>
                }
            </div>
        </section>
    )
}

export default Movies;