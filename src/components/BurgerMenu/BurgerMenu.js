import MobileNavigation from '../MobileNavigation/MobileNavigation';
import './BurgerMenu.css';
import { useState } from 'react';

const BurgerMenu = () => {
    const [isChecked, setIsChecked] = useState(false);

    const closeMobileMenu = () => {
        setIsChecked(false);
    }

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            <label className='burger-menu'>
                <input type='checkbox' checked={isChecked} onChange={handleChange} className='burger-menu__checkbox'></input>
                <span className='burger-menu__burger'></span>
            </label>
            <MobileNavigation
                isChecked={isChecked}
                onCloseMobileMenu={closeMobileMenu} />
        </>
    )
}

export default BurgerMenu;