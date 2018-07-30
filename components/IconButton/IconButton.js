import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './iconButton.scss';
import mouseTranslate from "../Global/mouseTranslate";
import {withTheme} from "../Global/withTheme";
import Link from 'next/link';

const cx = classNames.bind(styles);

const IconButton = ({
                        children,
                        className,
                        path,
                        asPath,
                        type,
                        inverted,
                        color,
                        title,
                        role,
                        right,
                        top,
                        bottom,
                        btnTransform,
                        ...other
                    }) => {

    let btnClasses = cx(
        className,
        styles.icon,
        {
            top: top,
            bottom: bottom,
            right: right,
            inverted: inverted,
        },
    );

    const commonProps = {
        className: btnClasses,
        style: {transform: btnTransform},
        ...other
    };

    const button = (
        <button {...commonProps}
                type={type}
                name={title}
                aria-label={title}
                data-mouse>
            {title ? <small className={styles.label}>{title}</small> : false}
            {children}
        </button>
    );

    const anchor = path && (
        <Link href={path} as={asPath} prefetch>
            <a {...commonProps} role={role} data-mouse>
                {title ? <small className={styles.label}>{title}</small> : false}
                {children}
            </a>
        </Link>
    );

    return path ? anchor : button;
};

IconButton.defaultProps = {
    disabled: false,
    type: 'button',
    inverted: false,
    right: false,
    top: false
};

IconButton.propTypes = {
    children: PropTypes.node,
    hasIcon: PropTypes.bool,
    mouse: PropTypes.bool,
    inverted: PropTypes.bool,
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

export default withTheme(mouseTranslate(IconButton));