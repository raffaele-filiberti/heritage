import React from 'react';

const Newsletter = ({stroke}) => (
    <svg viewBox="0 0 64 64" height={24} width={24}>
        <path d="M10 21.1L2 28m52-6.9l8 6.9"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
        <path d="M54 33.6V2H10v31.6M18 12h10m-4 8h22m-28 8h28"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
        <path d="M62 28v34H2V28m40.1 13.9L62 28M2 28l19.9 13.9"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
        <path d="M2 62l20.9-21.1c3.9-3.9 14.2-3.9 18.1 0L62 62"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
    </svg>
);

export default Newsletter;