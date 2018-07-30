import React from 'react';

const Arrow = ({stroke = "#222222"}) => (
    <svg viewBox="0 0 64 16" height={24} width={24}>
        <path d="M58,8 L0,8"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>

        <polyline
            points="49 16 58 8 49 0"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>

    </svg>
);

export default Arrow;