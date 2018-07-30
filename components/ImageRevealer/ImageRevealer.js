import React from 'react';
import styles from './imageRevealer.scss';
import classNames from "classnames/bind";
import imgix from "../Global/imgix";

const cx = classNames.bind(styles);

const ImageReveal = React.forwardRef(({src, paragraph, cover, height, width}, ref) => {

    let imageClass = cx(
        {revealer: true},
        {paragraph: paragraph},
        {cover: cover}
    );

    let url = '';

    if (cover) {
        url = imgix(src, {w: 1000, h: 1000});
    } else if (paragraph) {
        url = imgix(src, {w: width, h: height});
    } else {
        url = imgix(src, {w: 1200, h: 800});
    }

    return (
        <div className={imageClass} ref={ref}>
            <div className={styles.image} style={{backgroundImage: `url(${url})`}}/>
            <div className={styles.sliceContainer}>
                <div className={styles.slice}/>
            </div>
        </div>
    );
});

export default ImageReveal;
