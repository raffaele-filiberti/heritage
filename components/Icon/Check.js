
import React from 'react';

const Check = ({stroke}) => (
    <svg viewBox="0 0 64 64" height={24} width={24}>
        <path d="M2 30l21 22 39-40"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
    </svg>
);

export default Check;
