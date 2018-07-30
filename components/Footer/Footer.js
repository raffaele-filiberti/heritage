import React from "react";
import styles from './footer.scss';
import Pin from "../Icon/Pin";
import IconButton from "../IconButton";
import {MD} from "../ResponsiveWrapper/Responsive";
import ScrollDown from "../ScrollDown/ScrollDown";
import Link from 'next/link';

const Footer = ({menuIsOpen, hideUI, isInfo}) => (
    <React.Fragment>

        {!hideUI && <ScrollDown isInfo={isInfo}/>}

        <MD>
            <div className={styles.slideBtnWrapper}>
                <div className={styles.slideBtnInner}>
                    <Link href={'/store-locator'} prefetch>
                        <IconButton title={'store locator'}>
                            <Pin/>
                        </IconButton>
                    </Link>
                </div>
            </div>
        </MD>

    </React.Fragment>
);

export default Footer;