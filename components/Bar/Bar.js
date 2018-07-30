import React from 'react';
import styles from './bar.scss';
import classNames from "classnames/bind";
import {withTheme} from "../Global/withTheme";

const cx = classNames.bind(styles);

const Bar = ({inverted}) => {

    let barClasses = cx(
        styles.outer,
        {inverted: inverted},
    );

    return <div className={barClasses}/>;
};

export default withTheme(Bar);