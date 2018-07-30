import App, {Container} from 'next/app'
import React from 'react'
import withApolloClient from '../lib/with-apollo-client'
import {ApolloProvider} from 'react-apollo'
import Cursor from "../components/Cursor/Cursor";
import PageTransition from "../components/Global/PageTransition";
import {TweenMax} from "gsap";
import {MD} from "../components/ResponsiveWrapper/Responsive";

class MyApp extends App {
    render() {
        const {Component, pageProps, router, apolloClient} = this.props;

        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <PageTransition timeout={700} classNames="page-transition">
                        <Component {...pageProps} {...router}/>
                    </PageTransition>
                </ApolloProvider>
                <MD>
                    <Cursor/>
                </MD>
            </Container>
        )
    }
}

export default (withApolloClient(MyApp))