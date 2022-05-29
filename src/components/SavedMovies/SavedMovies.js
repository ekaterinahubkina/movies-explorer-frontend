import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import filterMovies from '../../utils/functions';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({ savedMovies, onDeleteMovie, savedMoviesIds, isDataLoading }) => {
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [shortFilteredMovies, setShortFilterseMovies] = useState([]);
    const [isCheckbobChecked, setIsCheckboxChecked] = useState(false);

    useEffect(() => {
        setFilteredMovies([...savedMovies])
    }, [savedMovies])

    const handleDeleteMovie = (movie) => {
        onDeleteMovie(movie);
    }

    const handleSearch = (message) => {
        const result = filterMovies(savedMovies, message)
        setFilteredMovies(result);
        const resultShort = result.filter((item) => item.duration <= 40);
        setShortFilterseMovies(resultShort);
    }

    const handleCheckboxChange = () => {
        setIsCheckboxChecked(!isCheckbobChecked)
    }

    return (
        <section className='movies saved-movies'>
            <div className='movies__wrapper'>
                <SearchForm isCheckbobChecked={isCheckbobChecked} onCheckboxChange={handleCheckboxChange} onSearchSubmit={handleSearch} />
                {isDataLoading ?
                    <Preloader />
                    :
                    <>
                        {isCheckbobChecked ?
                            <>{(shortFilteredMovies.length === 0) && <span className='movies__nothing-found'>Ничего не найдено</span>}</>
                            :
                            <>{(filteredMovies.length === 0) && <span className='movies__nothing-found'>Ничего не найдено</span>}</>
                        }
                        <MoviesCardList>
                            
                            {isCheckbobChecked ?
                                <>
                                    {shortFilteredMovies.map((item) => (
                                <MoviesCard card={item} {...item} key={item._id} handleDeleteMovie={handleDeleteMovie} savedMoviesIds={savedMoviesIds} />
                            ))}
                                </>
                                :
                                <>
                                    {filteredMovies.map((item) => (
                                <MoviesCard card={item} {...item} key={item._id} handleDeleteMovie={handleDeleteMovie} savedMoviesIds={savedMoviesIds} />
                            ))}
                                </>}
                        </MoviesCardList>
                    </>
                }
            </div>
        </section>
    )
}

export default SavedMovies;
