import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = ({ isCheckbobChecked, onCheckboxChange, onSearchSubmit, handleCheckboxOnLoadFromLocalstorage }) => {
    const location = useLocation();
    const [error, setError] = useState('');
    const [searchMessage, setSearchMessage] = useState(location.pathname === '/movies' ? localStorage.getItem('searchMessage') || '' : '');

    const handleChange = (event) => {
        setError('');
        setSearchMessage(event.target.value);
    }

    const handleCheckboxChange = () => {
        onCheckboxChange();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchMessage === '') {
            setError('Нужно ввести ключевое слово')
        } else {
            onSearchSubmit(searchMessage);
            setError('');
        }
        location.pathname === '/movies' && localStorage.setItem('searchMessage', searchMessage);
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
                    <FilterCheckbox isChecked={isCheckbobChecked} onCheckboxChange={handleCheckboxChange} />
                    <p>Короткометражки</p>
                </div>

            </form>
        </section>
    )
}

export default SearchForm;