import React from 'react';
import styles from './titleRevealer.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const TitleRevealer = React.forwardRef(({title, legal, split = false}, ref) => {

    const phrase = title.split(/\n|<br.*?>/gi);

    let titleClass = cx(
        {revealer: true},
        {legal: legal},
        {paragraph: !split},
        {single: split && phrase.length === 1},
        {double: split && phrase.length === 2},
        {triple: split && phrase.length === 3}
    );

    return (
        <React.Fragment>
            <div className={titleClass}>
                <h1 className={styles.title} ref={ref}>
                    {split ?
                        phrase.map((p, index) => <span key={index} className={styles.phrase}>{p}</span>) :
                        <span className={styles.phrase}>{title}</span>
                    }
                </h1>
            </div>
        </React.Fragment>
    );
});

export default TitleRevealer;
