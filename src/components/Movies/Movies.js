import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

function Movies({ movies, location, searchMessage, onSearchInputChange, onSearchSubmit, isSearchCheckboxChecked, onSearchCheckboxChange }) {
    return (
        <section className='movies'>
            <div className='movies__wrapper'>
                <SearchForm searchMessage={searchMessage}
                    onSearchInputChange={onSearchInputChange}
                    onSearchSubmit={onSearchSubmit}
                    isSearchCheckboxChecked={isSearchCheckboxChecked}
                    onSearchCheckboxChange={onSearchCheckboxChange} />
                <MoviesCardList location={location}>
                    {movies.map((item) => (
                        <MoviesCard card={item} {...item} key={item.id} location={location} />
                    ))}
                </MoviesCardList>
            </div>

        </section>
    )
}

export default Movies;