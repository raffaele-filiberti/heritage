import VideoHeading from "../components/Video/VideoHeading";
import Layout from "../components/Layout/Layout";
import Video from "../components/Video/Video";
import React from "react";
import {gql} from "apollo-boost";
import {Query} from "react-apollo";

export default () => (
    <Query query={HOME}>
        {({loading, data: {home: {video, seo}}}) => (
            <Layout
                seo={!seo ? {} : seo}
                isDark
                isInfo
            >
                <Video video={video} opacity={.5}/>
                <VideoHeading/>
            </Layout>
        )}
    </Query>
);

export const HOME = gql`{ 
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
