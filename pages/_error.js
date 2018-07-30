import React from 'react'
import Layout from "../components/Layout/Layout";
import Video from "../components/Video/Video";
import VideoHeading from "../components/Video/VideoHeading";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";

export default class Error extends React.Component {
    static getInitialProps({res, err}) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return {statusCode}
    }

    render() {
        const {seo, video, statusCode} = this.props;
        return (
            <Query query={ERROR}>
                {({loading, data: {home: {video, seo}}}) => (

                    <Layout
                        seo={!seo ? {} : seo}
                        isDark
                        isInfo
                    >
                        <Video video={video} opacity={.5}/>
                        <VideoHeading isError statusCode={statusCode}/>
                    </Layout>
                )}
            </Query>
        )
    }
}

export const ERROR = gql`{ 
  home {
    	seo {
  	    title
  	    description
  	}
  	video {
  	    url
  	}
  }
}`;