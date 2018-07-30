import React from 'react';

const Arrow = ({stroke}) => (
    <svg viewBox="0 0 64 64" height={24} width={24}>
        <path d="M26 20.006L40 32 26 44.006"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
    </svg>
);

export default Arrow;