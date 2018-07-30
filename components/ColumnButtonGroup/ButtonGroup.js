import React from 'react'
import styles from './buttonGroup.scss'
import classNames from "classnames/bind";
import IconButton from "../IconButton";
import Link from 'next/link';
import {TweenMax} from "gsap";
import Pin from "../Icon/Pin";


const ButtonGroup = ({
                            id,
                            title,
                            text,
                            subtitle = false,
                            image,
                            actionLink = false,
                            inViewport = false,
                        }) => {

    return (
        <li className={styles.wrapper}>
            <div className={styles.inner}>
                <div className={styles.label}><span>go to the</span><span>store locator</span></div>
                <Link href={`/store-locator`} prefetch>
                    <IconButton className={styles.btn}>
                        <Pin/>
                    </IconButton>
                </Link>
            </div>
        </li>
    );
};

export default ButtonGroup