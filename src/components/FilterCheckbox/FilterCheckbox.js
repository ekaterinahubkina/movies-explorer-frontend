import './FilterCheckbox.css';

const FilterCheckbox = () => {
    return (
        <label className='filter-checkbox'>
            <input type='checkbox' className='filter-checkbox__input'></input>
            <span className='filter-checkbox__slider round'></span>
        </label>
    )
}

export default FilterCheckbox;