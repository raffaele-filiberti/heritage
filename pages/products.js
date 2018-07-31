import Layout from "../components/Layout";
import React from "react";
import ProductOverview from "../components/ProductOverview/ProductOverview";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterIsOpen: false,
        }
    }


    static async getInitialProps({query}) {
        const {collection, series, target, shape, frame, type} = query;
        return {collection, series, target, shape, frame, type};
    }

    get initialFilters() {
        const {collection, series, target, shape, frame, type} = this.props;
        let filters = {};

        if (collection) {
            let uri = decodeURIComponent(collection);
            filters.collection = uri.split('|')
        }

        if (series) {
            let uri = decodeURIComponent(series);
            filters.series = uri.split('|')
        }

        if (target) {
            let uri = decodeURIComponent(target);
            filters.target = uri.split('|')
        }

        if (shape) {
            let uri = decodeURIComponent(shape);
            filters.shape = uri.split('|')
        }

        if (frame) {
            let uri = decodeURIComponent(frame);
            filters.frame = uri.split('|')
        }

        if (type) {
            let uri = decodeURIComponent(type);
            filters.type = uri.split('|')
        }

        return filters

    }

    toggleFilter = () => {
        this.setState({
            filterIsOpen: !this.state.filterIsOpen,
        });
    };

    render() {
        const initialFilters = this.initialFilters;
        const {filterIsOpen} = this.state;

        return (
            <Query query={SEO}>
                {({loading, data: {productsPage: {seo}}}) => (
                    <Layout
                        seo={!seo ? {} : seo}
                        isProducts
                        toggleFilter={this.toggleFilter}
                        filterIsOpen={filterIsOpen}
                    >
                        <ProductOverview filterIsOpen={filterIsOpen} initialFilters={initialFilters}/>
                    </Layout>
                )}
            </Query>
        );
    }
}

export const SEO = gql`{ 
  productsPage {
  	seo {
  	    title
  	    description
  	}
  }
}`;

export default Page;


