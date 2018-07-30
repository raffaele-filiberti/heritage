import React from 'react';

const View = ({stroke}) => (
    <svg viewBox="0 0 64 64" height={24} width={24}>
        <path d="M32 14.5C14.8 14.5 2.5 32 2.5 32S14.8 49.5 32 49.5 61.5 32 61.5 32 49.2 14.5 32 14.5z"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
        <circle cx="32"
                cy="31.5"
                r="10"
                fill="none"
                stroke={stroke}
                strokeMiterlimit="10"
                strokeWidth="2"
                strokeLinejoin="miter"
                strokeLinecap="butt"/>
        <path d="M28.5 29.5a4 4 0 0 0 3.5 6"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
    </svg>);

export default View;