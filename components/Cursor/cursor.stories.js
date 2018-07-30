import React from 'react';

import md from './cursor.md';

import {storiesOf} from '@storybook/react';

import {boolean, withKnobs} from '@storybook/addon-knobs/react';
import {withNotes} from '@storybook/addon-notes';
import backgrounds from "@storybook/addon-backgrounds";

import Cursor from "./Cursor";

storiesOf('Cursor', module)
    .addDecorator(withKnobs)
    .addDecorator(backgrounds([
        {name: "white", value: "#fff", default: true},
        {name: "black", value: "#161516"},
    ]))
    .add('events', withNotes(md)(() => (
            <Cursor isMouseDown={boolean('isMouseDown', false)}
                    isHover={boolean('isHover', false)}
                    isMin={boolean('isMin', false)}
                    outer={{x: 50, y: 50}}
                    pointer={{x: 50, y: 50}}/>
        )
    ));
