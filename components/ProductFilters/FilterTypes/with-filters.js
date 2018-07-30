import React from 'react';

export default function withFilters(WrappedFilter, property) {
    return class withFilters extends React.Component {
        constructor(props) {
            super(props);
            this.property = property;
            this.filters = this.props.filters || {};

            this.state = {
                filterValues: this.filters[property] || []
            }
        }

        changeHandler({isSelected, value}) {
            const {updateFilters} = this.props;
            const preparedFilters = this.prepareFilter({
                'action': isSelected,
                value
            });

            updateFilters({...preparedFilters})
        }

        prepareFilter({action, value}) {
            const {filterValues} = this.state;

            const index = filterValues.reduce((acc, filterValue, i) => (filterValue === value) ? i : acc, -1);

            if (index >= 0 && action) {
                filterValues[index] = value
            }
            else if (index === -1 && action) {
                filterValues.push(value)
            }
            else if (index >= 0 && !action) {
                filterValues.splice(index, 1)
            }

            return {
                property: this.property,
                values: filterValues
            }
        }

        render() {
            const {intl, filters} = this.props;
            const {filterValues} = this.state;

            return (
                <WrappedFilter {...this.props} changeHandler={(e) => this.changeHandler(e)}
                               selectedFilters={filterValues}/>
            )
        }
    }
}