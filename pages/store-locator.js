import React from 'react'

import Layout from '../components/Layout/Layout'
import StoreFinder from "../components/StoreFinder/StoreFinder";
import {Query} from "react-apollo";
import {gql} from "apollo-boost";

class Page extends React.Component {
    static async getInitialProps({req, query, pathname}) {
        return {currentUrl: pathname, query}
    }

    render() {
        const {currentUrl, query} = this.props;
        const portugalCenter = {lat: 39.4036393, lng: -8.1725036};

        return (
            <Query query={SEO}>
                {({loading, data: {storeLocator: {seo}}}) => (
                    <Layout
                        seo={!seo ? {} : seo}
                        currentUrl={currentUrl}
                        hideUI
                        isStore
                    >
                        <StoreFinder
                            storesApiUrl="https://api.grandvision.io/stores"
                            center={portugalCenter}
                            initialValue={query.search}
                            title="Store Locator"
                        />
                    </Layout>
                )}
            </Query>
        )
    }
}

export default Page;

export const SEO = gql`{ 
  storeLocator {
  	seo {
  	    title
  	    description
  	}
  }
}`;
