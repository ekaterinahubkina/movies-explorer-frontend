import './NavTab.css';

function NavTab () {
    return (
        <nav className='navTab'>
            <div className='navTab__wrapper'>
                <ul className='navTab__list'>
                    <li><a href='#about-project'>О проекте</a></li>
                    <li>Технологии</li>
                    <li>Студент</li>
                </ul>
            </div>
        </nav>
    )
}

export default NavTab;