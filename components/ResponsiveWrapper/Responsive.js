import Responsive from 'react-responsive';
import React from 'react';

export const XXL = props => <Responsive {...props} minWidth={1440} values={{ deviceWidth: 1600 }} />;
export const XL = props => <Responsive {...props} minWidth={1240} values={{ deviceWidth: 1400 }} />;
export const LG = props => <Responsive {...props} minWidth={1024} values={{ deviceWidth: 1600 }} />;
export const MD = props => <Responsive {...props} minWidth={768} values={{ deviceWidth: 768 }} />;
export const SM = props => <Responsive {...props} minWidth={576} values={{ deviceWidth: 1600 }} />;
export const MB = props => <Responsive {...props} maxWidth={767} values={{ deviceWidth: 1600 }} />;
export const ML = props => <Responsive {...props} maxWidth={1023} values={{ deviceWidth: 1600 }} />;


