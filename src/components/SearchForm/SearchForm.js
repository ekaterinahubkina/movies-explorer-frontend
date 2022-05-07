import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = () => {
    return (
        <section className='search'>
            <form className='search__form'>
                <div className='search__input-container'>
                    <input type='text' className='search__input' placeholder='Фильм'></input>
                    <button type='submit' className='search__button'>Поиск</button>
                </div>
                <div className='search__checkbox-container'>
                    <FilterCheckbox />
                    <p>Короткометражки</p>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;