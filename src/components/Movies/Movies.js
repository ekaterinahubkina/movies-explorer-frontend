import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

function Movies({ location }) {
    return (
        <section className='movies'>
            <div className='movies__wrapper'>
                <SearchForm />
                <MoviesCardList location={location}>
                    <MoviesCard location={location} />
                    <MoviesCard location={location} />
                    <MoviesCard location={location} />
                    <MoviesCard location={location} />
                </MoviesCardList>
            </div>

        </section>
    )
}

export default Movies;