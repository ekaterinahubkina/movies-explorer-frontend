import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

const SavedMovies = ({ location }) => {
    return (
        <section className='movies saved-movies'>
            <div className='movies__wrapper'>
                <SearchForm />
                <MoviesCardList location={location}>
                    <MoviesCard location={location} />
                </MoviesCardList>
            </div>
        </section>
    )
}

export default SavedMovies;
