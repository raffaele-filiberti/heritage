import Layout from "../components/Layout";
import React from "react";
import Slider from "../components/Slider/Slider";
import {Query} from "react-apollo";
import {gql} from "apollo-boost";

export default () => (
    <Query query={SEO}>
        {({loading, data: {collectionsPage: {seo}}}) => (
            <Layout
                seo={!seo ? {} : seo}
                isDark
                hideUI
            >
                <Slider/>
            </Layout>
        )}
    </Query>
);

export const SEO = gql`{ 
  collectionsPage {
  	seo {
  	    title
  	    description
  	}
  }
}`;
