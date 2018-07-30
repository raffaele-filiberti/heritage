import React from 'react';
import {gql} from "apollo-boost";
import {Query} from "react-apollo";
import ProductFilter from "../ProductFilters/ProductFilter";
import Scroller from "../Scroller/Scroller";
import ProductList from "../ProductList/ProductList";
import styles from './productOverview.scss';
import Router from 'next/router'

class ProductOverview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {...this.props.initialFilters},
        }
    }

    updateFilters = (obj) => {

        const test = [obj].reduce((object, current) => {
            let key = current['property'];
            if (current['values'].length > 0) {

                if (!object[key]) {
                    object[key] = [];
                }

                object[key] = current['values'];
            }

            return object;
        }, {});

        const filters = {...this.state.filters, ...test};

        const filterLabels = Object.getOwnPropertyNames(filters);

        let updatedFilters = {};

        //let slug = '';

        filterLabels.forEach(label => {
            if (filters[label].length > 0) {
                updatedFilters[label] = filters[label];
                //slug += `${label}=${updatedFilters[label].reduce((acc, value, index) => index && value + '|' + acc)}&`
            }
        });

        //const href = `/products?${slug}`;

        //console.log(slug);

        //Router.replace(href);

        this.setState({
            filters: updatedFilters
        })
    };

    render() {
        const {filterIsOpen} = this.props;
        const {filters} = this.state;

        return (
            <React.Fragment>

                <Query query={FILTERED_PRODUCTS}
                       variables={Object.keys(filters).length ? filters : {}}
                       pollInterval={1000}>
                    {({loading, data: {allEyewears}}) => {
                        return (
                            <React.Fragment>

                                <Scroller isFilter={filterIsOpen}>

                                    {allEyewears && <ProductList allEyewears={allEyewears}/>}
                                </Scroller>

                                <div className={styles.wrapper}>
                                    <div className={styles.inner}>
                                        <span className={styles.counter}>
                                            {!loading ? allEyewears && allEyewears.length ? allEyewears.length > 1 ? `products ${allEyewears.length}` : `product 1` : `product not found` : `loading`}
                                        </span>
                                    </div>
                                </div>

                            </React.Fragment>
                        )
                    }}
                </Query>
                <ProductFilter
                    filters={filters}
                    filterIsOpen={filterIsOpen}
                    updateFilters={this.updateFilters}
                />

            </React.Fragment>
        )
    }
}

export const FILTERED_PRODUCTS = gql`
query allFilteredProducts($collection: [ID], $series: [ID], $target: [ID], $frame: [ID], $shape: [ID], $type: [ID]) {
allEyewears(filter: {
    collection: {in: $collection},
    series: {in: $series},
    targetGroup: {in: $target},
    frame: {in: $frame},
    shape: {in: $shape},
    model: {in: $type}
    }) {
    id
    slug
    name
    image {
      id
      url
      width
    }
    series {
      id
      name
    }
    variants {
      id
      name
    }
    collection {
        id
        name
    }
    targetGroup {
      id
    }
    frame {
      id
    }
    shape {
      id
    }
    model {
      id
    }
  }
}`;

export default ProductOverview;

