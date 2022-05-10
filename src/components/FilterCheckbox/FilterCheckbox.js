import { useState } from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => {

    const [isChecked, setIsChecked] = useState(false);
    const handleChange = () => {
        setIsChecked(!isChecked);
    }

    return (
        <label className='filter-checkbox'>
            <input type='checkbox' checked={isChecked} onChange={handleChange} className='filter-checkbox__input'></input>
            <span className='filter-checkbox__slider round'></span>
        </label>
    )
}

export default FilterCheckbox;