import React from 'react';
import styles from './descriptionRevealer.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const DescriptionRevealer = React.forwardRef(({desc, reveal}, ref) => {

    let descClass = cx(
        {reveal: reveal},
        {revealer: true},
    );

    const words = desc.split(' ');

    return (
        <div className={descClass}>
            <p className={styles.desc} ref={ref}>{words.map((w, index) => <span key={index}>{w}</span>)}</p>
        </div>
    );
});

export default DescriptionRevealer;
