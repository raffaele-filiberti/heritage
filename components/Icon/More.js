import React from 'react';

const More = ({stroke}) => (
    <svg viewBox="0 0 64 64" height={24} width={24}>
        <circle cx="8" cy="32" r="6"
                fill="none"
                stroke={stroke}
                strokeMiterlimit="10"
                strokeWidth="2"
                strokeLinejoin="miter"
                strokeLinecap="butt"/>
        <circle cx="32" cy="32" r="6"
                fill="none"
                stroke={stroke}
                strokeMiterlimit="10"
                strokeWidth="2"
                strokeLinejoin="miter"
                strokeLinecap="butt"/>
        <circle cx="56" cy="32" r="6"
                fill="none"
                stroke={stroke}
                strokeMiterlimit="10"
                strokeWidth="2"
                strokeLinejoin="miter"
                strokeLinecap="butt"/>

    </svg>
);

export default More;