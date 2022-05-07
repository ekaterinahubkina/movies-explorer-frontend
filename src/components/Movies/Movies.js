import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';

function Movies() {
    return (
        <div className='movies'>
            <div className='movies__wrapper'>
                <SearchForm />
            </div>

        </div>
    )
}

export default Movies;