import SectionTitle from '../SectionTitle/SectionTitle';
import './AboutProject.css';

function AboutProject() {
    return (
        <section className='about-project' id='about-project'>
            <div className='about-project__wrapper'>
                <SectionTitle title='О проекте' />
                <div className='about-project__info'>
                    <div className='about-project__stages'>
                        <h3>Дипломный проект включал 5 этапов</h3>
                        <p>Составление плана, работу над бэкендом, вёрстку,
                            добавление функциональности и финальные доработки.</p>
                    </div>
                    <div className='about-project__duration'>
                        <h3>На выполнение диплома ушло 5 недель</h3>
                        <p>У каждого этапа был мягкий и жёсткий дедлайн,
                            которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className='about-project__duration-bar'>
                    <div className='about-project__backend-duration'><span>1 неделя</span></div>
                    <div className='about-project__frontend-duration'><span>4 недели</span></div>
                    <span className='about-project__backend'>Back-end</span>
                    <span className='about-project__frontend'>Front-end</span>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;