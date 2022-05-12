import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutMe.css';
import me from '../../images/me.jpg';

function AboutMe() {
    return (
        <section className='about-me' id='about-me'>
            <div className='about-me__wrapper'>
                <SectionTitle title='Студент' />
                <div className='about-me__info'>
                    <h2 className='about-me__name'>Екатерина</h2>
                    <p className='about-me__occupation'>Фронтенд-разработчик, 31 год</p>
                    <p className='about-me__about'>Я живу в Беларуси в г. Минске, по профессии преподаватель английского языка, закончила ин.яз.  
                    Последние 9 месяцев изучаю веб-разработку в Яндекс Практикуме, после окончания курса хочу сменить сферу деятельности и заниматься Frontend разработкой, так как мне нравится 
                    кодить и создать красивые и удобные пользовательские интерфейсы. Свободное время провожу с детьми, любим вместе ходить в бассейн и кататься на велосипедах или роликах.</p>
                    <ul className='about-me__links'>
                        <li><a href='https://www.facebook.com/' target='blank'>Facebook</a></li>
                        <li><a href='https://github.com/ekaterinahubkina' target='blank'>Github</a></li>
                    </ul>
                    <img className='about-me__photo' src={me} alt='фото'></img>
                </div>

            </div>
        </section>
    )
}

export default AboutMe;