import './NavTab.css';

function NavTab () {
    return (
        <nav className='nav-tab'>
            <div className='nav-tab__wrapper'>
                <ul className='nav-tab__list'>
                    <li><a href='#about-project'>О проекте</a></li>
                    <li><a href='#techs'>Технологии</a></li>
                    <li><a href='#about-me'>Студент</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavTab;