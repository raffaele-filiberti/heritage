import Layout from "../components/Layout";
import React from "react";
import Scroller from "../components/Scroller/Scroller";
import {SEO} from "../components/Layout/Layout";
import {Query} from "react-apollo";
import {gql} from "apollo-boost";
import HeadingGroup from "../components/ColumnHeadingGroup/HeadingGroup";
import Column from "../components/Column/Column";

class Page extends React.Component {
    static async getInitialProps({query}) {
        const {slug} = query;
        console.log(slug);
        return {slug};
    }

    render() {
        const {slug} = this.props;

        return (
            <Query query={COLLECTION}
                   variables={{slug: slug}}
            >
                {({loading, data: {collection: {displayTitle, image, id, content, seo}}}) => (
                    <Layout seo={!seo ? {} : seo }>
                        <Scroller>
                            <HeadingGroup subtitle={'collection'} title={displayTitle} image={image}/>
                            <Column items={content} id={id}/>
                        </Scroller>
                    </Layout>
                )}
            </Query>
        );
    }
}

export const COLLECTION = gql` 
  query collectionDetail($slug: String!) {
  collection(filter: {slug: {eq: $slug}}) {
    id
    name
    slug
    displayTitle
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
            _modelApiKey
            id
          }
          ... on FrameRecord {
            _modelApiKey
            id
          }
          ... on EyewearRecord {
            _modelApiKey
            id
          }
          ... on ShapeRecord {
            _modelApiKey
            id
          }
        }
      }
    }
  }
}`;

export default Page;