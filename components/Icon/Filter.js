import React from 'react';

const Filter = ({stroke}) => (
    <svg viewBox="0 0 64 64" height={24} width={24}>
        <path d="M2 2h59L36 34v20l-8 8V34L2 2z"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
    </svg>
);

export default Filter;