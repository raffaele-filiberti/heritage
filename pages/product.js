import Layout from "../components/Layout";
import React from "react";
import Scroller from "../components/Scroller/Scroller";
import {gql} from "apollo-boost";
import ProductCanvas from "../components/ProductCanvas/ProductCanvas";
import {Query} from "react-apollo";
import ProductFeatures from "../components/ProductFeatures";
import ButtonGroup from "../components/ColumnButtonGroup/ButtonGroup";
import ParagraphGroup from "../components/ColumnParagraphGroup/ParagraphGroup";

class Page extends React.Component {
    static async getInitialProps({query}) {
        const {slug, ...rest} = query;
        return {slug, params: {...rest}};
    }

    render() {
        const {slug, params} = this.props;

        return (
            <Query query={EYEWEAR}
                   variables={{slug: slug}}
            >
                {({loading, data: {eyewear: {name, description, image, collection, model, shape, targetGroup, frame, polarized, seo}}}) => (
                    <Layout seo={!seo ? {} : seo} isDetail={params}>
                        <Scroller>
                            <ParagraphGroup title={name} collection={collection} text={description} split/>
                            <ProductCanvas image={image}/>
                            <ProductFeatures type={model}
                                             features={{frame: frame, shape: shape, polarized: polarized}}/>
                            <ButtonGroup/>
                        </Scroller>
                    </Layout>
                )}
            </Query>
        );
    }
}

export const EYEWEAR = gql`
  query eyewearDetail($slug: String!) {
	eyewear(filter: { slug: { eq: $slug } }) {
    name
    description
    image {
        url
        alt
    }
    collection {
        name
        slug
    }
    frame {
        name
    }
    shape {
        name
    }
    targetGroup {
        name
    }
    model {
        slug
    }
    polarized
    seo {
  	    title
  	    description
  	}

  }
}`;


export default Page
