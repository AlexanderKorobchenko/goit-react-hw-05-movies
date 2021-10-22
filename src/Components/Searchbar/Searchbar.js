import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(value.trim().toLowerCase());
  };

  return (
    <div className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies..."
          onChange={handleChange}
          value={value}
        />

        <button type="submit" className={s.button}>
          <ImSearch />
        </button>
      </form>
    </div>
  );
}

Searchbar.protoType = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
