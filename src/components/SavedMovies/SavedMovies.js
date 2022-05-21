import { useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import filterMovies from '../../utils/functions';

const SavedMovies = ({ savedMovies, onDeleteMovie, savedMoviesIds }) => {
    const [filteredMovies, setFilteredMovies] = useState([...savedMovies]);

    const handleDeleteMovie = (movie) => {
        onDeleteMovie(movie);
    }

    const handleSearch = (message, isChecked) => {
        setFilteredMovies(filterMovies(savedMovies, message, isChecked));
    }

    return (
        <section className='movies saved-movies'>
            <div className='movies__wrapper'>
                <SearchForm onSearchSubmit={handleSearch}/>
                <MoviesCardList>
                    {filteredMovies.map((item) => (
                        <MoviesCard card={item} {...item} key={item._id} handleDeleteMovie={handleDeleteMovie} savedMoviesIds={savedMoviesIds}/>
                    ))}
                </MoviesCardList>
            </div>
        </section>
    )
}

export default SavedMovies;
