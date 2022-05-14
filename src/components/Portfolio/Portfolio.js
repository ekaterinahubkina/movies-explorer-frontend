import './Portfolio.css';

function Portfolio() {
    return (
        <section className='portfolio'>
            <div className='portfolio__wrapper'>
                <h3 className='portfolio__title'>Портфолио</h3>
                <ul className='portfolio__list'>
                    <li><a href='https://github.com/ekaterinahubkina/how-to-learn' target='blank'>Статичный сайт</a></li>
                    <li><a href='https://ekaterinahubkina.github.io/yet-another-project/index.html' target='blank'>Адаптивный сайт</a></li>
                    <li><a href='https://mesto.hubkina.nomoredomains.work/' target='blank'>Одностраничное приложение</a></li>
                </ul>
            </div>
        </section>
    )
}

export default Portfolio;