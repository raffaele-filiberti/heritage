import Layout from "../components/Layout";
import React from "react";
import Scroller from "../components/Scroller/Scroller";
import {Query} from "react-apollo";
import {gql} from "apollo-boost/lib/index";
import Column from "../components/Column/Column";
import HeadingGroup from "../components/ColumnHeadingGroup/HeadingGroup";

export default class Page extends React.Component {

    static async getInitialProps({query: {slug}}) {
        return {slug};
    }

    render() {
        const {slug} = this.props;

        return (
            <Query query={LEGAL}
                   variables={{slug: slug}}
            >
                {({loading, data: {legal: {displayTitle, subtitle, content, seo }}}) => (
                    <Layout
                        seo={!seo ? {} : seo }
                        currentUrl={`/${slug}`}
                    >
                        <Scroller>
                            <HeadingGroup title={displayTitle} subtitle={subtitle} legal />
                            <Column items={content}/>
                        </Scroller>
                    </Layout>
                )}
            </Query>
        );

    }
}

export const LEGAL = gql` 
  query legal($slug: String!) {
  legal(filter: {slug: {eq: $slug}}) {
    displayTitle
    subtitle
    slug
    seo {
      title
      description
    }
    content {
      ... on ChapterGroupRecord {
        model: _modelApiKey
        title
        text
      }
    }
  }
}`;