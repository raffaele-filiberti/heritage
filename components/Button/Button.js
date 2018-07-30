import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './button.scss';
import {withTheme} from "../Global/withTheme";

const cx = classNames.bind(styles);

const btnTransform = {
    x: [-50, 50],
    y: [-50, 50],
};

const Button = ({
                    className,
                    type,
                    title,
                    role,
                    navLink,
                    active,
                    link,
                    forced,
                    ...other
                }) => {

        let btnClasses = cx(className,
            styles.extrusion,
            {
                active: active,
                inverted: !forced,
                navLink: navLink
            }
        );

        const commonProps = {
            className: btnClasses,
            "data-min": true
        };

        const child = (
            <span data-text={title} className={styles.outer}>
                <span>{title}</span>
            </span>
        );

        return !link ?
            <button {...other} {...commonProps}>{child}</button> : <a {...other} {...commonProps} role={role}>{child}</a>
    }
;

Button.defaultProps = {
    disabled: false,
    type: 'button',
};

Button.propTypes = {
    children: PropTypes.node,
    hasIcon: PropTypes.bool,
    mouse: PropTypes.bool,
    link: PropTypes.bool,
    icon: PropTypes.bool,
    color: PropTypes.oneOf([
        'primary',
        'secondary',
        'white',
        'blank',
    ]),
    path: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    role: PropTypes.string,
};

export default Button;