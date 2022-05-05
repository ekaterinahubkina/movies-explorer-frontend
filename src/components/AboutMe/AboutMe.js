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
                    <p className='about-me__about'>Я родился и живу в Саратове, закончил факультет экономики СГУ.
                        У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                        С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
                        начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
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