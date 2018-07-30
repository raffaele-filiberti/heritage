import * as React from 'react'
import PropTypes from 'prop-types';
import styles from './storeSearch.scss'
import Search from "../Icon/Search";

const StoreSearch = ({ onFormSubmit, onQueryChange, initialValue, placeholder }) => (
    <form className={styles.form} noValidate onSubmit={onFormSubmit}>
        <label className={styles.control}>
            <input
                className={styles.input}
                value={initialValue || ''}
                onChange={({ target }) => onQueryChange(target.value)}
                placeholder={placeholder || null}
            />
        </label>
        <button className={styles.submit} type="submit" data-mouse>
            <Search/>

        </button>
    </form>
);

StoreSearch.propTypes = {
    onFormSubmit: PropTypes.func,
    onQueryChange: PropTypes.func,
    initialValue: PropTypes.string,
    placeholder: PropTypes.string,
};

export default StoreSearch