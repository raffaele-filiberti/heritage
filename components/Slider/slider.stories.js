import React from 'react';
import {storiesOf} from '@storybook/react';
import Slider from "./Slider";
import Layout from "../Layout/Layout";

const SLIDES = [
    {
        title: 'lorem ipsum<br> dolor sit 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda debitis dignissimos dolore ducimus eveniet exercitationem expedita facilis incidunt minus nam obcaecati quas quasi quia rerum sint sunt totam, voluptate!',
        src: './01.jpg'
    },
    {
        title: 'lorem ipsum<br> dolor sit <br> consectetur',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda debitis dignissimos dolore ducimus eveniet exercitationem expedita facilis incidunt minus nam obcaecati quas quasi quia rerum sint sunt totam, voluptate!',
        src: './02.jpg'
    },
    {
        title: 'lorem ipsum<br> dolor',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias assumenda debitis dignissimos dolore ducimus eveniet exercitationem expedita facilis incidunt minus nam obcaecati quas quasi quia rerum sint sunt totam, voluptate!',
        src: './03.jpg'
    },
];

const Inverted = React.createContext(true);

storiesOf('Slider', module)
    .add('container', () => (
            <Layout isDark>
                <Slider slides={SLIDES}/>
            </Layout>
    ));