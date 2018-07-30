import React from 'react';

const Pin = ({stroke}) => (
    <svg viewBox="0 0 64 64" height={24} width={24}>
        <path d="M55.9 28.3c.1-.8.1-1.5.1-2.3a24 24 0 0 0-48 0c0 .8 0 1.6.1 2.3v.3C10.1 47.6 32 61 32 61s21.9-13.6 23.8-32.3z"
              fill="none"
              stroke={stroke}
              strokeMiterlimit="10"
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="butt"/>
        <circle r="12"
                cy="26"
                cx="32"
                fill="none"
                stroke={stroke}
                strokeMiterlimit="10"
                strokeWidth="2"
                strokeLinejoin="miter"
                strokeLinecap="butt"/>
    </svg>
);

export default Pin;