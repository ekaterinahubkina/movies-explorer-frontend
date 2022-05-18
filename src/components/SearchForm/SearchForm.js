import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = ({ searchMessage, onSearchInputChange, onSearchSubmit, isSearchCheckboxChecked, onSearchCheckboxChange }) => {
    const [error, setError] = useState('');
    const handleChange = (event) => {
        setError('');
        onSearchInputChange(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchMessage === '') {
            setError('Нужно ввести ключевое слово')
        } else {
            onSearchSubmit();
            setError('');
        }
    }


    return (
        <section className='search'>
            <form className='search__form' onSubmit={handleSubmit}>
                <div className='search__input-container'>
                    <input type='text' value={searchMessage || ''} onChange={handleChange} className='search__input' placeholder='Фильм'></input>
                    <button type='submit' className='search__button'>Поиск</button>
                </div>
                <span className='form__error form__error_type_search'>{error}</span>
                <div className='search__checkbox-container'>
                    <FilterCheckbox isSearchCheckboxChecked={isSearchCheckboxChecked} onSearchCheckboxChange={onSearchCheckboxChange} />
                    <p>Короткометражки</p>
                </div>

            </form>
        </section>
    )
}

export default SearchForm;