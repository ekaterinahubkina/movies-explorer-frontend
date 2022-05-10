import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ location }) {
    return (
        <section className='movies'>
            <div className='movies__wrapper'>
                <SearchForm />
                <MoviesCardList location={location} />
            </div>

        </section>
    )
}

export default Movies;