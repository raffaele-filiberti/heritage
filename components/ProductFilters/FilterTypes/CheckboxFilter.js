import React from 'react';
import styles from '../productFilter.scss';

export const CheckboxFilter = ({changeHandler, checked, name, value}) => (
    <div className={styles.control}>
        <input
            onChange={({target}) => changeHandler({isSelected: target.checked, value: target.value})}
            className={styles.checkbox}
            type="checkbox"
            id={`filter-checkbox-${value}`}
            name={name.toLowerCase()}
            value={value.toLowerCase()}
            defaultChecked={checked}
            data-min
        />
        <label className={styles.label} htmlFor={`filter-checkbox-${value}`}>
            <span className={styles.icon} />
            <span className={styles.text} data-min>{name}</span>
        </label>
    </div>
);
