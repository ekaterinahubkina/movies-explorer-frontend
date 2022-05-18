import './FilterCheckbox.css';

const FilterCheckbox = ({isSearchCheckboxChecked, onSearchCheckboxChange}) => {

    const handleChange = () => {
        onSearchCheckboxChange();
    }

    return (
        <label className='filter-checkbox'>
            <input type='checkbox' checked={isSearchCheckboxChecked} onChange={handleChange} className='filter-checkbox__input'></input>
            <span className='filter-checkbox__slider round'></span>
        </label>
    )
}

export default FilterCheckbox;