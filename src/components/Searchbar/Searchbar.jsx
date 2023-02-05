import { useState } from 'react';
import style from '../Searchbar/searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmitForm }) => {
  const [query, setQuery] = useState('');
  const hangleInput = el => {
    const data = el.target.value;
    setQuery(data);
  };

  const onSubmit = el => {
    el.preventDefault();
    onSubmitForm(query);
    setQuery('');
  };

  return (
    <header className={style.searchbar}>
      <form onSubmit={onSubmit} className={style.searchForm}>
        <button type="submit" className={style.searchFormButton}>
          <span className={style.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={style.searchFormInput}
          type="text"
          value={query}
          placeholder="Search images and photos"
          onChange={hangleInput}
          required
        />
      </form>
    </header>
  );
};
export default Searchbar;
Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
