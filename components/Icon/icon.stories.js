import React from 'react';

import {storiesOf} from '@storybook/react';

import View from './View';
import Grid from "./Grid";
import Arrow from "./Arrow";
import Pin from "./Pin";
import Filter from "./Filter";
import More from "./More";
import Newsletter from "./Newsletter";

storiesOf('Icon', module)
    .add('all', () => (
        <div style={{
            height: '100vh',
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around'
        }}>
            <View stroke={'#000'}/>
            <Grid stroke={'#000'}/>
            <Arrow stroke={'#000'}/>
            <More stroke={'#000'}/>
            <Filter stroke={'#000'}/>
            <Pin stroke={'#000'}/>
            <Newsletter stroke={'#000'}/>
        </div>
    ));