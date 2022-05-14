import './Footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <div className='footer__wrapper'>
                <h4 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h4>
                <div>
                    <p className='footer__copyright'>&copy; 2022</p>
                    <ul className='footer__links'>
                        <li><a href='https://practicum.yandex.ru/' target='blank'>Яндекс.Практикум</a></li>
                        <li><a href='https://github.com/ekaterinahubkina' target='blank'>Github</a></li>
                        <li><a href='https://www.facebook.com/' target='blank'>Facebook</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;