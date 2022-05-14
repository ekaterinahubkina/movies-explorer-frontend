import SectionTitle from '../SectionTitle/SectionTitle';
import './Techs.css';

function Techs() {
    return (
        <section className='techs' id='techs'>
            <div className='techs__wrapper'>
                <SectionTitle title='Технологии' />
                <div className='techs__description'>
                    <h2>7 технологий</h2>
                    <p>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                </div>
                <ul className='techs__list'>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JS</li>
                    <li>React</li>
                    <li>Git</li>
                    <li>Express.js</li>
                    <li>mongoDB</li>
                </ul>
            </div>
        </section>
    )
}

export default Techs;