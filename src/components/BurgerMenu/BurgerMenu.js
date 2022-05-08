import MobileNavigation from '../MobileNavigation/MobileNavigation';
import './BurgerMenu.css';
import { useState } from 'react';

const BurgerMenu = ({ location, currentWidth, isMobileMenuOpen, onBurgerMenuClick, onCloseMobileMenu }) => {

    // const [isChecked, setIsChecked] = useState(false);

    // const handleChange = () => {
    //     setIsChecked(!isChecked);
    // };

    return (
        <>
            {
                location.pathname === '/' ?
                    null
                    :
                    <>
                        <label className='burger-menu'>
                            <input type='checkbox' onClick={onBurgerMenuClick} className='burger-menu__checkbox'></input>
                            <span className='burger-menu__burger'></span>
                        </label>
                        <MobileNavigation 
                        // isChecked={isChecked} 
                        urrentWidth={currentWidth}
                        isMobileMenuOpen={isMobileMenuOpen}
                        onBurgerMenuClick={onBurgerMenuClick}
                        onCloseMobileMenu={onCloseMobileMenu} />
                        
                    </>
            }
        </>
    )
}

export default BurgerMenu;