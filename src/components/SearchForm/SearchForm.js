import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = ({ onSearchSubmit }) => {
    const location = useLocation();
    const [error, setError] = useState('');
    const [searchMessage, setSearchMessage] = useState(location.pathname === '/movies' ? localStorage.getItem('searchMessage') || '' : '');
    const [isChecked, setIsChecked] = useState(location.pathname === '/movies' ? JSON.parse(localStorage.getItem('checkboxStatus')) || false : false);

    const handleChange = (event) => {
        setError('');
        setSearchMessage(event.target.value);
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchMessage === '') {
            setError('Нужно ввести ключевое слово')
        } else {
            onSearchSubmit(searchMessage, isChecked);
            setError('');
        }
        location.pathname === '/movies' && localStorage.setItem('searchMessage', searchMessage);
        location.pathname === '/movies' && localStorage.setItem('checkboxStatus', JSON.stringify(isChecked));
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
                    <FilterCheckbox isChecked={isChecked} onCheckboxChange={handleCheckboxChange} />
                    <p>Короткометражки</p>
                </div>

            </form>
        </section>
    )
}

export default SearchForm;