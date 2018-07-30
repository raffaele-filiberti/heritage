
import React from 'react';

const Close = ({stroke}) => (
    <svg viewBox="0 0 64 64" height={24} width={24}>
        <path d="M41.999 20.002l-22 22m22 0L20 20"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
    </svg>
);

export default Close;
