import React from 'react';
import styles from './burger.scss';
import classNames from "classnames/bind";
import {withTheme} from "../Global/withTheme";

const cx = classNames.bind(styles);

const Burger = ({
                    className,
                    inverted,
                    isClose,
                    ...rest
                }) => {
    let BurgerClass = cx(
        {
            isClose: isClose
        },
        {
            inverted: inverted
        },
        {
            inner: true
        },
    );

    return (
        <div className={BurgerClass} {...rest}>
            <span/>
            <span/>
            <span/>
        </div>
    );
};

Burger.propTypes = {};

export default withTheme(Burger);