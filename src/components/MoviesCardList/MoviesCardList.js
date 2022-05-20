import './MoviesCardList.css';

const MoviesCardList = ({ location, children }) => {
    return (
        <>
            <section className='movies-card-list'>
                {children}
            </section>
            {/* {location.pathname === '/movies' && 
            <div className='more-btn-container'>
                <button className='more-btn'>Ещё</button>
            </div>} */}
        </>

    )
}

export default MoviesCardList;