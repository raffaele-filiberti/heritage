import React from 'react';
import styles from './scrolldown.scss';
import classNames from "classnames/bind";
import {withTheme} from "../Global/withTheme";
import {MB, MD} from "../ResponsiveWrapper/Responsive";
import Link from 'next/link';
import Scroll from "../Icon/Scroll";

const cx = classNames.bind(styles);

const ScrollDown = ({inverted, isInfo}) => {

    let scrollDownClass = cx(
        {
            wrapper: true,
            inverted: inverted,
            center: isInfo,
        }
    );

    return (
        <div className={scrollDownClass}>
            <div className={styles.inner}>
                {isInfo ?
                    <span className={styles.txt}>
                            Heritage by
                            <Link href={'/legal?slug=grandvision'} as={'/grandvision'}>
                                <a className={'baseLink'} data-min>
                                    Grandvision
                                </a>
                            </Link>
                        </span> :
                    <React.Fragment>
                        <MD>
                            <span className={styles.txt}>Scroll to navigate </span>
                        </MD>
                        <MB>
                            <span className={styles.txt}>Navigate</span>
                        </MB>
                        <Scroll/>
                    </React.Fragment>
                }
            </div>
        </div>
    )
};

export default withTheme(ScrollDown);