import React from 'react';

const Back = ({stroke}) => (
    <svg viewBox="0 0 64 64" height={24} width={24}>
        <path d="M14 31.998h36"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>

        <path d="M28 18L14 32l14 14"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>

    </svg>
);

export default Back;