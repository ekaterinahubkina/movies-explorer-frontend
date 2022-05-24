import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState } from 'react';
import filterMovies from '../../utils/functions';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function Movies({ onSearchSubmit, numberOfCardsToRender, numberOfCardsToAdd, onSaveMovie, savedMoviesIds,
    onDislikeMovie, isDataLoading, isInfoTooltipOpen, onCloseInfoTooltip, isRequestOk }) {

    const [filteredMovies, setFilteredMovies] = useState(JSON.parse(localStorage.getItem('filteredMovies')) || []);
    const [shortFilteredMovies, setShortFilterseMovies] = useState(JSON.parse(localStorage.getItem('shortFilteredMovies')) || []);
    const [isCheckbobChecked, setIsCheckboxChecked] = useState(JSON.parse(localStorage.getItem('checkboxStatus')) || false);
    const [cardsToRender, setCardsToRender] = useState(numberOfCardsToRender);
    const [isSeachHandeled, setIsSearchHandled] = useState(false);

    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!isCheckbobChecked);
        setIsSearchHandled(true);
    }

    const handleSearch = (message) => {
        setCardsToRender(numberOfCardsToRender);
        onSearchSubmit((movies) => {
            const result = filterMovies(movies, message)
            setFilteredMovies(result);
            const resultShort = result.filter((item) => item.duration <= 40);
            setShortFilterseMovies(resultShort);
            if (isCheckbobChecked) {
                localStorage.setItem('shortFilteredMovies', JSON.stringify(resultShort));
                localStorage.removeItem('filteredMovies');
            } else {
                localStorage.setItem('filteredMovies', JSON.stringify(result));
                localStorage.removeItem('shortFilteredMovies');
            }
            localStorage.setItem('checkboxStatus', JSON.stringify(isCheckbobChecked));
        });

        setIsSearchHandled(true);
    }

    const handleButtonMoreClick = () => {
        setCardsToRender(cardsToRender + numberOfCardsToAdd)
    }

    const handleMovieCardLike = (card) => {
        onSaveMovie(card)
    }

    return (
        <>
            <section className='movies'>
                <div className='movies__wrapper'>
                    <SearchForm isCheckbobChecked={isCheckbobChecked} onCheckboxChange={handleCheckboxChange} onSearchSubmit={handleSearch} />
                    {isDataLoading ?
                        <Preloader />
                        :
                        <>
                            {isCheckbobChecked ?
                                <>{(isSeachHandeled && shortFilteredMovies.length === 0) && <span className='movies__nothing-found'>Ничего не найдено</span>}</>
                                :
                                <>{(isSeachHandeled && filteredMovies.length === 0) && <span className='movies__nothing-found'>Ничего не найдено</span>}</>
                            }
                            <MoviesCardList>
                                {isCheckbobChecked ?
                                    <>
                                        {shortFilteredMovies.slice(0, cardsToRender).map((item) => (
                                            <MoviesCard card={item} {...item} key={item.id} handleMovieCardLike={handleMovieCardLike} savedMoviesIds={savedMoviesIds}
                                                onDislikeMovie={onDislikeMovie} />
                                        ))}
                                    </>
                                    :
                                    <>
                                        {filteredMovies.slice(0, cardsToRender).map((item) => (
                                            <MoviesCard card={item} {...item} key={item.id} handleMovieCardLike={handleMovieCardLike} savedMoviesIds={savedMoviesIds}
                                                onDislikeMovie={onDislikeMovie} />
                                        ))}
                                    </>}

                            </MoviesCardList>

                            {isCheckbobChecked ?
                                <>
                                    {shortFilteredMovies.length > shortFilteredMovies.slice(0, numberOfCardsToRender).length && shortFilteredMovies.length >= cardsToRender ?
                                        <div className='more-btn-container'>
                                            <button className='more-btn' onClick={handleButtonMoreClick}>Ещё</button>
                                        </div>
                                        :
                                        null}
                                </>
                                :
                                <>
                                    {filteredMovies.length > filteredMovies.slice(0, numberOfCardsToRender).length && filteredMovies.length >= cardsToRender ?
                                        <div className='more-btn-container'>
                                            <button className='more-btn' onClick={handleButtonMoreClick}>Ещё</button>
                                        </div>
                                        :
                                        null}
                                </>}
                        </>
                    }

                </div>
            </section>
            <InfoTooltip isOpen={isInfoTooltipOpen} onClose={onCloseInfoTooltip} isRequestOk={isRequestOk} />
        </>
    )
}

export default Movies;