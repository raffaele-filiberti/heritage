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
            <Query query={PAGE}
                   variables={{slug: slug}}
            >
                {({loading, data: {page: {displayTitle, subtitle, image, id, content, seo }}}) => (
                    <Layout
                        seo={!seo ? {} : seo }
                        currentUrl={`/${slug}`}
                    >
                        <Scroller>
                            <HeadingGroup subtitle={subtitle} title={displayTitle} image={image}/>
                            <Column items={content}/>
                        </Scroller>
                    </Layout>
                )}
            </Query>
        );

    }
}

export const PAGE = gql` 
  query page($slug: String!) {
  page(filter: {slug: {eq: $slug}}) {
    title
    slug
    displayTitle
    subtitle
    image {
      url
    }
    seo {
      title
      description
    }
    content {
      ... on TitleGroupRecord {
        model: _modelApiKey
        title
        watercolor {
            url
        }
      }
      ... on ParagraphGroupRecord {
        model: _modelApiKey
        title
        subtitle
        text
        image {
          url
          alt
        }
        actionLink {
          ... on SeriesRecord {
            slug
          }
          ... on FrameRecord {
            slug
          }
          ... on EyewearRecord {
            slug
          }
          ... on FrameRecord {
            slug
          }
        }
      }
    }
  }
}`;