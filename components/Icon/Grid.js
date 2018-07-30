

import React from 'react';

const Grid = ({stroke}) => (
    <svg viewBox="0 0 64 64" height={24} width={24}>
        <path d="M2 2h12v12H2zm24 0h12v12H26zm24 0h12v12H50zM2 50h12v12H2z"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
        <path d="M26 50h12v12H26zm24 0h12v12H50z"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
        <path d="M2 25.988h12v12H2z"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
        <path d="M26 25.988h12v12H26zm24 0h12v12H50z"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
    </svg>
);

export default Grid;