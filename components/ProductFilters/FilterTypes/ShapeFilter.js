import React from 'react';
import styles from '../productFilter.scss';
import {CheckboxFilter} from "./CheckboxFilter";
import withFilters from './with-filters';
import {graphql} from "react-apollo";
import {gql} from "apollo-boost";

const ShapeFilter = ({data: {label}, filters = [], changeHandler}) => (
    <fieldset className={styles.filter}>
        <legend className={styles.legend}>{'Shape'}</legend>
        {
            label.map(({id, name}) => (
                <CheckboxFilter
                    key={id}
                    value={id}
                    name={name}
                    checked={filters.includes(id)}
                    changeHandler={changeHandler}
                />
            ))
        }
    </fieldset>
);

export const filters = gql`{
  label: allShapes {
    id
    name
    slug
  }
}`;

export default withFilters(graphql(filters)(ShapeFilter), 'shape');