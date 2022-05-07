// import MobileNavigation from '../MobileNavigation/MobileNavigation';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import './BurgerMenu.css';
import { useState } from 'react';

const BurgerMenu = ({ location }) => {

    const [isChecked, setIsChecked] = useState(false);

    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <>
            {
                location.pathname === '/' ?
                    null
                    :
                    <>
                        <label className='burger-menu'>
                            <input type='checkbox' checked={isChecked} onChange={handleChange} className='burger-menu__checkbox'></input>
                            <span className='burger-menu__burger'></span>
                        </label>
                        <MobileNavigation isChecked={isChecked}/>
                        
                    </>
            }
        </>
    )
}

export default BurgerMenu;