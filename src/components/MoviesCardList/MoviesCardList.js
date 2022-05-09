import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ location }) => {
    return (
        <>
            <section className='movies-card-list'>
                <MoviesCard location={location} />
                <MoviesCard location={location} />
                <MoviesCard location={location} />
                <MoviesCard location={location} />
            </section>
            {location.pathname === '/movies' && 
            <div className='more-btn-container'>
                <button className='more-btn'>Ещё</button>
            </div>}
        </>

    )
}

export default MoviesCardList;