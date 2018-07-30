import React from 'react';
import styles from './transition.scss';

const TransitionOverlay = React.forwardRef((props, ref) => (
    <div className={'overlay'} ref={ref}>
        <div className={'item'}/>
        <div className={'item'}/>
    </div>
));

export default TransitionOverlay