import React from 'react';

const Search = ({stroke}) => (
    <svg viewBox="0 0 64 64" height={24} width={24}>
        <path d="M38.192 38.191L50 50"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
        <circle r="13"
                cy="29"
                cx="29"
                fill="none"
                stroke={stroke}
                strokeMiterlimit="10"
                strokeWidth="2"
                strokeLinejoin="miter"
                strokeLinecap="butt"/>
    </svg>
);

export default Search;